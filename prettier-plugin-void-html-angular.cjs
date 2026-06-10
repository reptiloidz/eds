const {
    parsers: prettierHtmlParsers,
    printers: prettierHtmlPrinters,
} = require("prettier/plugins/html");

const htmlLocStart = prettierHtmlParsers.html.locStart;
const htmlLocEnd = prettierHtmlParsers.html.locEnd;

const ANGULAR_BLOCK_PREFIX =
    /^@(if|else\s+if|else|for|switch|case|default|defer|placeholder|loading|error|let)\b/u;
const AT_ENTITY = "&#64;";
const AT_ENTITY_PATTERN = /^(?:&#64;|&commat;)/u;

/** @param {string} text @param {number} start */
function findTagEnd(text, start) {
    let i = start + 1;
    let quote = null;

    while (i < text.length) {
        const char = text[i];

        if (quote) {
            if (char === quote && text[i - 1] !== "\\") {
                quote = null;
            }
        } else if (char === '"' || char === "'") {
            quote = char;
        } else if (char === ">") {
            return i + 1;
        }

        i += 1;
    }

    return text.length;
}

/** @param {string} text @param {number} start */
function findInterpolationEnd(text, start) {
    const end = text.indexOf("}}", start + 2);

    return end === -1 ? text.length : end + 2;
}

/** @param {string} text @param {number} start */
function findCommentEnd(text, start) {
    const end = text.indexOf("-->", start);

    return end === -1 ? text.length : end + 3;
}

/** @param {string} text @param {number} start */
function findNextSpecialIndex(text, start) {
    for (let i = start; i < text.length; i += 1) {
        if (
            text[i] === "<" ||
            text.startsWith("{{", i) ||
            text.startsWith("<!--", i)
        ) {
            return i;
        }
    }

    return text.length;
}

/** @param {string} text @param {number} start @param {number} end */
function escapeAtInTextRange(text, start, end) {
    let result = "";

    for (let i = start; i < end; ) {
        if (text[i] !== "@") {
            result += text[i];
            i += 1;
            continue;
        }

        const rest = text.slice(i);
        const entityMatch = rest.match(AT_ENTITY_PATTERN);

        if (entityMatch) {
            result += entityMatch[0];
            i += entityMatch[0].length;
            continue;
        }

        const blockMatch = rest.match(ANGULAR_BLOCK_PREFIX);

        if (blockMatch) {
            result += blockMatch[0];
            i += blockMatch[0].length;
            continue;
        }

        result += AT_ENTITY;
        i += 1;
    }

    return result;
}

/** @param {string} template */
function escapeAtSignsInTemplateText(template) {
    if (!template.includes("@")) {
        return template;
    }

    let result = "";
    let i = 0;

    while (i < template.length) {
        if (template.startsWith("<!--", i)) {
            const end = findCommentEnd(template, i + 4);
            result += template.slice(i, end);
            i = end;
            continue;
        }

        if (template[i] === "<") {
            const end = findTagEnd(template, i);
            result += template.slice(i, end);
            i = end;
            continue;
        }

        if (template.startsWith("{{", i)) {
            const end = findInterpolationEnd(template, i);
            result += template.slice(i, end);
            i = end;
            continue;
        }

        const end = findNextSpecialIndex(template, i);
        result += escapeAtInTextRange(template, i, end);
        i = end;
    }

    return result;
}

/** @param {import('prettier').Parser} parser */
function wrapParserWithAtEscape(parser) {
    return {
        ...parser,
        preprocess(text, options) {
            const preprocessed = parser.preprocess
                ? parser.preprocess(text, options)
                : text;

            return escapeAtSignsInTemplateText(preprocessed);
        },
    };
}

/** @param {import('prettier/plugins/html').HtmlNode} node @param {import('prettier').ParserOptions} options */
function getClassAttributeOriginalText(node, options) {
    return options.originalText.slice(htmlLocStart(node), htmlLocEnd(node));
}

/** @param {import('prettier/plugins/html').HtmlNode} node @param {import('prettier').ParserOptions} options */
function isMultilineClassAttribute(node, options) {
    if (
        node?.type !== "attribute" ||
        node.name !== "class" ||
        !node.valueSpan
    ) {
        return false;
    }

    const originalValue = options.originalText.slice(
        node.valueSpan.start.offset,
        node.valueSpan.end.offset,
    );

    return /\n/u.test(originalValue);
}

/** @param {import('prettier/plugins/html').HtmlNode} attribute */
function getClassNames(attribute) {
    return String(attribute.value).trim().split(/\s+/u).filter(Boolean);
}

/** @param {import('prettier/plugins/html').HtmlNode} attribute @param {import('prettier').ParserOptions} options */
function isValidMultilineClassLayout(attribute, options) {
    if (!isMultilineClassAttribute(attribute, options)) {
        return false;
    }

    const original = getClassAttributeOriginalText(attribute, options);

    return !original
        .split("\n")
        .some((line) => line.length > options.printWidth);
}

/** @param {import('prettier/plugins/html').HtmlNode} attribute @param {import('prettier').ParserOptions} options */
function shouldUseClassColumnLayout(attribute, options) {
    if (attribute?.type !== "attribute" || attribute.name !== "class") {
        return false;
    }

    if (getClassNames(attribute).length <= 1) {
        return false;
    }

    if (isValidMultilineClassLayout(attribute, options)) {
        return false;
    }

    const original = getClassAttributeOriginalText(attribute, options);

    return (
        original.length > options.printWidth ||
        isMultilineClassAttribute(attribute, options)
    );
}

/** @param {import('prettier').AstPath<import('prettier/plugins/html').HtmlNode>} attributePath @param {import('prettier').ParserOptions} options */
function getAttributeIndent(attributePath, options) {
    const tab = options.useTabs ? "\t" : " ".repeat(options.tabWidth);
    const depth = attributePath.ancestors.filter(
        (ancestor) => ancestor.type !== "root",
    ).length;

    return tab.repeat(depth);
}

/** @param {import('prettier').AstPath<import('prettier/plugins/html').HtmlNode>} attributePath @param {import('prettier').ParserOptions} options */
function wrapLongClassAttribute(attributePath, options) {
    const attribute = attributePath.node;
    const original = getClassAttributeOriginalText(attribute, options);
    const quote = original.includes("'") ? "'" : '"';
    const classNames = getClassNames(attribute);

    if (classNames.length <= 1) {
        return original;
    }

    const attributeIndent = getAttributeIndent(attributePath, options);
    const tab = options.useTabs ? "\t" : " ".repeat(options.tabWidth);
    const innerIndent = attributeIndent + tab;

    return `class=${quote}\n${classNames.map((className) => innerIndent + className).join("\n")}\n${attributeIndent}${quote}`;
}

/** @param {import('prettier').AstPath<import('prettier/plugins/html').HtmlNode>} attributePath @param {import('prettier').ParserOptions} options @param {Function} callback */
function printClassAttribute(attributePath, options, callback) {
    const attribute = attributePath.node;

    if (shouldUseClassColumnLayout(attribute, options)) {
        return wrapLongClassAttribute(attributePath, options);
    }

    if (isMultilineClassAttribute(attribute, options)) {
        return getClassAttributeOriginalText(attribute, options);
    }

    return callback(attributePath);
}

/** @param {import('prettier').AstPath<import('prettier/plugins/html').HtmlNode>} path @param {import('prettier').ParserOptions} options */
function patchClassAttributePrinting(path, options) {
    const needsPatch = path.node.attrs?.some(
        (attribute) =>
            attribute.name === "class" &&
            (shouldUseClassColumnLayout(attribute, options) ||
                isMultilineClassAttribute(attribute, options)),
    );

    if (!needsPatch) {
        return;
    }

    const originalMap = path.map.bind(path);

    path.map = (callback, key, ...args) => {
        if (key !== "attrs") {
            return originalMap(callback, key, ...args);
        }

        return originalMap(
            (attributePath) => {
                if (
                    attributePath.node.type === "attribute" &&
                    attributePath.node.name === "class"
                ) {
                    return printClassAttribute(
                        attributePath,
                        options,
                        callback,
                    );
                }

                return callback(attributePath);
            },
            key,
            ...args,
        );
    };
}

/** @param {import('prettier/doc.js').builders.Doc} doc */
function isGroup(doc) {
    return (
        typeof doc === "object" &&
        doc !== null &&
        "type" in doc &&
        doc.type === "group"
    );
}

const htmlParser = wrapParserWithAtEscape({
    ...prettierHtmlParsers.html,
    astFormat: "html",
});

const htmlPrinter = {
    ...prettierHtmlPrinters.html,
    print(path, options, print) {
        const node = path.node;

        patchClassAttributePrinting(path, options);

        if (!["svg", "math"].includes(node.namespace)) {
            node.isSelfClosing = false;
        }

        if (path.previous?.tagDefinition?.isVoid) {
            path.previous.isSelfClosing = false;
        }

        if (!node.tagDefinition?.isVoid) {
            return prettierHtmlPrinters.html.print(path, options, print);
        }

        const printed = prettierHtmlPrinters.html.print(path, options, print);

        if (isGroup(printed) && Array.isArray(printed.contents)) {
            printed.contents.pop();

            if (
                path.next?.isLeadingSpaceSensitive &&
                !path.next.hasLeadingSpaces &&
                isGroup(printed.contents[0]) &&
                Array.isArray(printed.contents[0].contents)
            ) {
                printed.contents[0].contents.pop();
            }
        }

        node.isSelfClosing = true;
        return printed;
    },
};

module.exports = {
    parsers: {
        html: htmlParser,
        angular: wrapParserWithAtEscape(prettierHtmlParsers.angular),
    },
    printers: { html: htmlPrinter },
};
