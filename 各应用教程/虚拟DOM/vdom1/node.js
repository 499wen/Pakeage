var vdom = vnode(
    "div",
    { id: "_Q5", style: "border: 1px solid red;" },
    vnode(
        "div",
        { style: "text-align: center; margin: 36px auto 18px; width: 160px; line-height: 0;" },
        vnode("img", { src: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=853274459,1824385022&fm=27&gp=0.jpg", height: "56", style: "border: none; margin: 8px 0px;" }),
        "hello"
    )
);
var vdom1 = vnode(
    "div",
    { id: "_Q5", style: "border: 1px solid red;" },
    vnode(
        "div",
        { style: "text-align: center; margin: 36px auto 18px; width: 160px; line-height: 0;" },
        vnode("img", { src: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=853274459,1824385022&fm=27&gp=0.jpg", height: "56", style: "border: none; margin: 8px 0px;" }),
        "helloworld"
    )
);
function vnode(type, props, ...children) {
    return { type:type, props:props, children:children };
}
function createElement(node) {
    if (typeof node === 'string') {
        return document.createTextNode(node);
    }
    const $el = document.createElement(node.type);
    // set props
    setProps($el, node.props);
    node.children
        .map(createElement)
        .forEach($el.appendChild.bind($el));
    return $el;
}
function updateElement($parent, newNode, oldNode, index = 0) {
    if (!oldNode) {
        $parent.appendChild(
            createElement(newNode)
        );
    } else if (!newNode) {
        $parent.removeChild(
            $parent.childNodes[index]
        );
    } else if (changed(newNode, oldNode)) {
        $parent.replaceChild(
            createElement(newNode),
            $parent.childNodes[index]
        );
    } else if (newNode.type) {
        updateProps(
            $parent.childNodes[index],
            newNode.props,
            oldNode.props
        );
        const newLength = newNode.children.length;
        const oldLength = oldNode.children.length;
        for (let i = 0; i < newLength || i < oldLength; i++) {
            updateElement(
                $parent.childNodes[index],
                newNode.children[i],
                oldNode.children[i],
                i
            );
        }
    }
}
function changed(node1, node2) {
    return typeof node1 !== typeof node2 ||
        typeof node1 === 'string' && node1 !== node2 ||
        node1.type !== node2.type
}
//set props
function setProps($target, props) {
    props && Object.keys(props).forEach(name => {  //Object.keys()获取props对象的所有属性
        setProp($target, name, props[name]);
    });
}
function setProp($target, name, value) {
    if (typeof value === "boolean") {
        if (value) {
            $target.setAttribute(name, value);
            $target[name] = true;
        } else {
            $target[name] = false;
        }
    } else {
        $target.setAttribute(name, value);
    }
}
function removeProp($target, name, value) {
    if (typeof value === "boolean") {
         $target.removeAttribute(name);
         $target[name] = false;
    } else {
        $target.removeAttribute(name);
    }
}
function updateProps($target, newProps, oldProps = {}) {
    const props = Object.assign({}, newProps, oldProps);
    Object.keys(props).forEach(name => {
        updateProp($target, name, newProps[name], oldProps[name]);
    });
}
function updateProp($target, name, newVal, oldVal) {
    if (!newVal) {
        removeProp($target, name, oldVal);
    } else if (!oldVal || newVal !== oldVal) {
        setProp($target, name, newVal);
    }
}
let content = document.querySelector("#content")
updateElement(content, vdom);
setTimeout(() => {
    updateElement(content, vdom1, vdom);
}, 3000)