/**
 * @name TemplateEngine
 *
 * @description Binds data to a template
 * @param {html} string Template string
 * @param {data} object Data to bind to the template
 * @return {string} The generated template
 */

var TemplateEngine = function(html, data) {
    var re = /<%(.+?)%>/g, 
        reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g, 
        code = 'var r=[];\n', 
        cursor = 0;

    var add = function(line, js) {
        js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
            (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
        return add;
    }
    while(match = re.exec(html)) {
        add(html.slice(cursor, match.index))(match[1], true);
        cursor = match.index + match[0].length;
    }

    add(html.substr(cursor, html.length - cursor));
    code += 'return r.join("");';
    return new Function(code.replace(/[\r\t\n]/g, '')).apply(data);
}

/**
 * @name RenderTemplate
 *
 * @description Binds data to a template
 * @param {template} string: Template Selector
 * @param {data} object: Data to bind to the template
 */

var RenderTemplate = function (template, data) {
    var template = document.querySelector(template),
        templateInnerHTML = unencodeHTML(template.innerHTML);

    template.innerHTML = TemplateEngine(templateInnerHTML, data);
}
