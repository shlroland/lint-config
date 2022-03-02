"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    extends: 'stylelint-config-standard',
    plugins: ['stylelint-order'],
    rules: {
        'order/order': [
            'declarations',
            'custom-properties',
            'dollar-variables',
            'rules',
            'at-rules',
        ],
        'order/properties-order': [
            'position',
            'top',
            'right',
            'bottom',
            'left',
            'float',
            'clear',
            'display',
            'flex',
            'flex-grow',
            'flex-shrink',
            'flex-basis',
            'flex-flow',
            'flex-direction',
            'flex-wrap',
            'justify-content',
            'align-content',
            'align-items',
            'align-self',
            'order',
            'grid',
            'grid-template-rows',
            'grid-template-columns',
            'grid-template-areas',
            'grid-auto-rows',
            'grid-auto-columns',
            'grid-auto-flow',
            'grid-column-gap',
            'grid-row-gap',
            'grid-template',
            'grid-template-rows',
            'grid-template-columns',
            'grid-template-areas',
            'grid-gap',
            'grid-row-gap',
            'grid-column-gap',
            'grid-area',
            'grid-row-start',
            'grid-row-end',
            'grid-column-start',
            'grid-column-end',
            'grid-column',
            'grid-column-start',
            'grid-column-end',
            'grid-row',
            'grid-row-start',
            'grid-row-end',
            'table-layout',
            'empty-cells',
            'caption-side',
            'border-collapse',
            'border-spacing',
            'list-style',
            'list-style-type',
            'list-style-position',
            'list-style-image',
            'ruby-align',
            'ruby-merge',
            'ruby-position',
            'box-sizing',
            'width',
            'min-width',
            'max-width',
            'height',
            'min-height',
            'max-height',
            'padding',
            'padding-top',
            'padding-right',
            'padding-bottom',
            'padding-left',
            'border',
            'border-width',
            'border-top-width',
            'border-right-width',
            'border-bottom-width',
            'border-left-width',
            'border-style',
            'border-top-style',
            'border-right-style',
            'border-bottom-style',
            'border-left-style',
            'border-color',
            'border-top-color',
            'border-right-color',
            'border-bottom-color',
            'border-left-color',
            'border-image',
            'border-image-source',
            'border-image-slice',
            'border-image-width',
            'border-image-outset',
            'border-image-repeat',
            'border-top',
            'border-top-width',
            'border-top-style',
            'border-top-color',
            'border-top',
            'border-right-width',
            'border-right-style',
            'border-right-color',
            'border-bottom',
            'border-bottom-width',
            'border-bottom-style',
            'border-bottom-color',
            'border-left',
            'border-left-width',
            'border-left-style',
            'border-left-color',
            'border-radius',
            'border-top-right-radius',
            'border-bottom-right-radius',
            'border-bottom-left-radius',
            'border-top-left-radius',
            'outline',
            'outline-width',
            'outline-color',
            'outline-style',
            'outline-offset',
            'margin',
            'margin-top',
            'margin-right',
            'margin-bottom',
            'margin-left',
            'color',
            'background',
            'background-image',
            'background-position',
            'background-size',
            'background-repeat',
            'background-origin',
            'background-clip',
            'background-attachment',
            'background-color',
            'background-blend-mode',
            'isolation',
            'clip-path',
            'mask',
            'mask-image',
            'mask-mode',
            'mask-position',
            'mask-size',
            'mask-repeat',
            'mask-origin',
            'mask-clip',
            'mask-composite',
            'mask-type',
            'filter',
            'box-shadow',
            'opacity',
            'visibility',
            'overflow',
            'overflow-x',
            'overflow-y',
            'vertical-align',
            'columns',
            'columns-width',
            'columns-count',
            'column-rule',
            'column-rule-width',
            'column-rule-style',
            'column-rule-color',
            'column-fill',
            'column-span',
            'column-gap',
            'orphans',
            'writing-mode',
            'text-combine-upright',
            'unicode-bidi',
            'text-orientation',
            'direction',
            'text-rendering',
            'font-feature-settings',
            'font-language-override',
            'font',
            'font-style',
            'font-variant',
            'font-weight',
            'font-stretch',
            'font-size',
            'font-family',
            'line-height',
            'text-overflow',
            'white-space',
            'overflow-wrap',
            'word-wrap',
            'word-break',
            'line-break',
            'hyphens',
            'text-align',
            'text-align-last',
            'text-justify',
            'font-synthesis',
            'font-size-adjust',
            'letter-spacing',
            'font-kerning',
            'word-spacing',
            'text-transform',
            'quotes',
            'tab-size',
            'text-indent',
            'text-emphasis',
            'text-emphasis-style',
            'text-emphasis-color',
            'text-emphasis-position',
            'text-decoration',
            'text-decoration-color',
            'text-decoration-style',
            'text-decoration-line',
            'text-underline-position',
            'text-shadow',
            'image-rendering',
            'image-orientation',
            'image-resolution',
            'shape-image-threshold',
            'shape-outside',
            'shape-margin',
            'transform-style',
            'transform',
            'transform-box',
            'transform-origin',
            'perspective',
            'perspective-origin',
            'backface-visibility',
            'transition',
            'transition-property',
            'transition-duration',
            'transition-timing-function',
            'transition-delay',
            'animation',
            'animation-name',
            'animation-duration',
            'animation-timing-function',
            'animation-delay',
            'animation-iteration-count',
            'animation-direction',
            'animation-fill-mode',
            'animation-play-state',
            'scroll-behavior',
            'scroll-snap-type',
            'scroll-snap-destination',
            'scroll-snap-coordinate',
            'resize',
            'cursor',
            'touch-action',
            'caret-color',
            'ime-mode',
            'object-fit',
            'object-position',
            'content',
            'counter-reset',
            'counter-increment',
            'will-change',
            'pointer-events',
            'z-index',
            'all',
            'page-break-before',
            'page-break-after',
            'page-break-inside',
            'widows',
        ],
        'selector-pseudo-class-no-unknown': [
            true,
            {
                ignorePseudoClasses: ['global'],
            },
        ],
        'at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: ['function', 'if', 'else', 'include', 'extend', 'mixin'],
            },
        ],
        'color-no-invalid-hex': true,
        // Disallow invalid hex colors
        'color-hex-case': 'lower',
        // Specify lowercase or uppercase for hex colors.
        'color-hex-length': 'long',
        // Specify short or long notation for hex colors.
        'font-family-no-duplicate-names': true,
        // Disallow duplicate font family names
        'string-no-newline': true,
        // Disallow (unescaped) newlines in strings.
        'unit-no-unknown': true,
        // Disallow unknown units.
        'declaration-block-no-duplicate-properties': true,
        // Disallow duplicate properties within declaration blocks.
        'declaration-block-no-shorthand-property-overrides': true,
        // Disallow shorthand properties that override related longhand properties.
        'declaration-block-trailing-semicolon': 'always',
        // Require a trailing semicolon within declaration blocks.
        'block-no-empty': true,
        // Disallow empty blocks.
        'comment-no-empty': true,
        // Disallow empty comments.
        'no-duplicate-at-import-rules': true,
        // Disallow duplicate @import rules within a stylesheet.
        'no-duplicate-selectors': true,
        // Disallow duplicate selectors within a stylesheet.
        'no-empty-source': true,
        // Disallow empty sources.
        'no-extra-semicolons': true,
        // Disallow extra semicolons (Autofixable).
        'no-invalid-double-slash-comments': true,
        // Disallow double-slash comments (//...) which are not supported by CSS.
        'color-named': 'never',
        // Colors must never be named.
        indentation: 2,
        // indent 2 spaces
        linebreaks: 'unix',
        // LF in unix/linux/Mac OSX
        'max-empty-lines': 1,
        // Limit the number of adjacent empty lines.
        'no-eol-whitespace': true,
        // Disallow end-of-line whitespace.
        'no-missing-end-of-source-newline': true,
        // Disallow missing end-of-source newlines (Autofixable).
        'no-empty-first-line': true,
        // Disallow empty first lines (Autofixable).
        'number-leading-zero': 'never',
        // Disallow a leading zero for fractional numbers less than 1.
        'number-no-trailing-zeros': true,
        // Disallow trailing zeros in numbers.
        'string-quotes': 'single',
        // Specify single quotes around strings.
        'value-keyword-case': 'lower',
        // Specify lowercase for keywords values.
        'property-case': 'lower',
        // Specify lowercase for properties.
        'declaration-bang-space-after': 'never',
        // disallow whitespace after the bang of declarations.
        'declaration-bang-space-before': 'always',
        // Require whitespace before the bang of declarations.
        'block-opening-brace-space-before': 'always',
        // Require a single space or disallow whitespace before the opening brace of blocks.
        'function-comma-space-before': 'never',
        // Disallow whitespace before the commas of functions (Autofixable).
        'function-comma-space-after': 'always-single-line',
        // Require a single space after the commas of functions (Autofixable).
        'value-list-comma-space-before': 'never',
        // Disallow whitespace before the commas of value lists (Autofixable).
        'value-list-comma-space-after': 'always',
        // Require a single space after the commas of value lists (Autofixable).
        'function-url-no-scheme-relative': true,
        // Disallow scheme-relative urls
        'function-url-quotes': [
            'always',
            {
                except: 'empty',
            },
        ],
        // Require quotes for urls.
        'declaration-block-semicolon-space-after': 'always-single-line',
        'declaration-block-semicolon-space-before': 'never',
        'declaration-colon-space-after': 'always-single-line',
        'declaration-colon-space-before': 'never',
        'selector-attribute-brackets-space-inside': 'never',
        'selector-combinator-space-after': 'always',
        'selector-combinator-space-before': 'always',
        'selector-pseudo-class-parentheses-space-inside': 'never',
        'selector-list-comma-space-after': 'always-single-line',
        'selector-list-comma-space-before': 'never',
    },
};
exports.default = config;
module.exports = config;
