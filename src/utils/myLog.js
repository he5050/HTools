/**
 * @description 返回这个样式的颜色值
 * @param {String} type 样式名称 [ primary | success | warning | danger | text ]
 */

export function typeColor(type = "default") {
    let color = "";
    switch (type) {
        case "default":
            color = "#35495E";
            break;
        case "primary":
            color = "#3488ff";
            break;
        case "success":
            color = "#43B883";
            break;
        case "warning":
            color = "#e6a23c";
            break;
        case "danger":
            color = "#f56c6c";
            break;
        default:
            break;
    }
    return color;
}

/**
 * @description 打印一个 [ title | text ] 样式的信息
 * @param {String} title title text
 * @param {String} info info text
 * @param {String} type style
 */
export const capsuleLog = function(title = "无标题", info = "无内容", type = "primary") {
    if (typeof info === "string") {
        console.log(
            `%c ${title} %c ${info} %c ${type} %c`,
            "background:#35495E; padding: 1px; border-radius: 3px 0 0 3px; color: #fff;",
            `background:${typeColor(
                type
            )}; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff;`,
            "background: #b5e3e3; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff;",
            "background:transparent"
        );
    } else {
        console.time("Timer");
        console.log(
            `%c ${title} %c ------ 开始 ------ %c`,
            "background:#35495E; padding: 1px; border-radius: 3px 0 0 3px; color: #fff;",
            `background:${typeColor(
                type
            )}; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff;`,
            "background:transparent"
        );
        console.dir(info);
        console.log(
            `%c ${title} %c ------ 结束 ------ %c`,
            "background:#35495E; padding: 1px; border-radius: 3px 0 0 3px; color: #fff;",
            `background:${typeColor(
                type
            )}; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff;`,
            "background:transparent"
        );
        console.timeEnd("Timer");
    }
};
