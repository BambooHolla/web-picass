/*

  首先在HTML页面中引入clip.js，然后给需要渐变效果的HTML元素（比如SPAN）添加name属性和rel属性，格式如下：
    <div class="box">
        &lt;span name="clip:g" rel="#00ffff-#000000"&gt;蓝黑渐变文字&lt;/span&gt;
    </div>
    <ol class="box">
        <li>name属性作为渐变标示，name值不正确，将不会产生效果；</li>
        <li>rel值提供头和尾的颜色，以16进制颜色代码为准，格式为”起始颜色-末端颜色“，其他格式不予支持。格式不正确将不产生效果。</li>
        <li>最后需要在页面上加上clip.gradient().init({t:["SPAN","A"]});这段代码生成渐变色。</li>
    </ol>
    <p>
        演示：<span name="clip:g" rel="#00ffff-#000000">蓝黑渐变文字</span>
        <br /> 这是一段文字，我们可以随意挑选几个字做
        <span name="clip:g" rel="#ff008f-#00ff00">渐变效果</span>，字体的样式<span name="clip:g" rel="#cc0000-#00ffff">随页面的全局样式变化</span>，和本JS无关，这里用黑体可以看的更仔细。
    </p>

*/


// 官网首页 2行字体
var clip = {};
//clip渐变字体，修改渐变方向在colorful方法
// clip.gradient().init({t: ["SPAN", "A"]});  启动，里面的span,a指要寻找的标签
clip.gradient = function(data) {
    return {
        data: data,
        $: function(ele) {
            if (typeof ele == "object") return ele;
            else if (typeof ele == "string" || typeof ele == "number") return document.getElementById(ele.toString());
            return null;
        },
        $name: function(ele, tag) {
            if (typeof ele == "object") return ele;
            else if (typeof ele == "string" || typeof ele == "number") {
                var elem = document.getElementsByTagName(tag);
                var arr = new Array();
                for (var i = 0, iarr = 0; i < elem.length; i++) {
                    att = elem[i].getAttribute("name");
                    if (att == ele.toString()) {
                        arr[iarr] = elem[i];
                        iarr++;
                    }
                }
                return arr;
            } else {
                return null;
            }
        },
        slip: function(c) {
            return {
                r: parseInt(c.substring(1, 3), 16),
                g: parseInt(c.substring(3, 5), 16),
                b: parseInt(c.substring(5, 7), 16)
            };
        },
        vabs: function(s, e) {
            return {
                r: e.r - s.r,
                g: e.g - s.g,
                b: e.b - s.b
            };
        },
        colorful: function(ele, s, e) {
            ele = this.$(ele);
            var r, g, b, t, v, num, font, href;
            if (ele.tagName == "A") {
                t = "A";
                href = ele.href;
            } else {
                t = "I";
            }
            v = this.vabs(s, e);
            ele.style.cssText = "position:relative;display:inline-block;*display:inline;*zoom:1;";
            // 渐变方向
            // num = ele.scrollWidth;
            num = ele.scrollHeight;
            font = ele.innerHTML;
            var color;
            for (var i = 0; i <= num; i++) {
                var j = i + 1;

                if (i < (num / 20 * 8)) {
                    color = num & i / 16
                } else if (i < (num / 20 * 14)) {
                    color = num & i / 6
                } else if (i < (num / 20 * 16)) {
                    color = num & i / 2
                } else if (i >= (num / 20 * 16)) {

                    color = num & i
                }

                r = s.r + Math.round(v.r / num * color);
                g = s.g + Math.round(v.g / num * color);
                b = s.b + Math.round(v.b / num * color);
                var iObj = document.createElement(t);
                iObj.innerHTML = font;
                // 渐变方向裁剪
                // iObj.style.clip = "rect(auto " + j + "px auto " + i + "px)";
                iObj.style.clip = "rect(" + i + "px auto " + j + "px auto )";
                iObj.style.color = "rgb(" + r + "," + g + "," + b + ")";
                iObj.style.position = "absolute";
                iObj.href = href;
                iObj.style.fontStyle = "normal";
                iObj.style.left = iObj.offsetLeft;
                iObj.style.top = iObj.offsetTop;
                ele.appendChild(iObj);
            }
        },
        check: function(c) {
            var reg = /^#[a-fA-F0-9]{6}-#[a-fA-F0-9]{6}$/;
            if (reg.test(c)) return {
                s: this.slip(c.split("-")[0]),
                e: this.slip(c.split("-")[1])
            }
            return false;
        },
        init: function(tag) {
            if (tag) {
                for (var i = 0; i < tag.t.length; i++) {
                    var clips = this.$name("clip:g", tag.t[i]);
                    for (var j = 0; j < clips.length; j++) {
                        var self = clips[j];
                        var rel = self.getAttribute("rel");
                        if (rel && this.check(rel)) {
                            this.colorful(self, this.check(rel).s, this.check(rel).e);
                        }
                    }
                }
            }
        }
    }
};
clip.gradient().init({
    t: ["SPAN"]
});

// 优势页面，样式不一样重调
var clip2 = {};
//clip渐变字体，修改渐变方向在colorful方法
// clip.gradient().init({t: ["SPAN", "A"]});  启动，里面的span,a指要寻找的标签
clip2.gradient = function(data) {
    return {
        data: data,
        $: function(ele) {
            if (typeof ele == "object") return ele;
            else if (typeof ele == "string" || typeof ele == "number") return document.getElementById(ele.toString());
            return null;
        },
        $name: function(ele, tag) {
            if (typeof ele == "object") return ele;
            else if (typeof ele == "string" || typeof ele == "number") {
                var elem = document.querySelectorAll(tag);
                var arr = new Array();
                for (var i = 0, iarr = 0; i < elem.length; i++) {
                    att = elem[i].getAttribute("name");
                    if (att == ele.toString()) {
                        arr[iarr] = elem[i];
                        iarr++;
                    }
                }
                return arr;
            } else {
                return null;
            }
        },
        slip: function(c) {
            return {
                r: parseInt(c.substring(1, 3), 16),
                g: parseInt(c.substring(3, 5), 16),
                b: parseInt(c.substring(5, 7), 16)
            };
        },
        vabs: function(s, e) {
            return {
                r: e.r - s.r,
                g: e.g - s.g,
                b: e.b - s.b
            };
        },
        colorful: function(ele, s, e) {
            ele = this.$(ele);
            var r, g, b, t, v, num, font, href;
            if (ele.tagName == "A") {
                t = "A";
                href = ele.href;
            } else {
                t = "I";
            }
            v = this.vabs(s, e);
            ele.style.cssText = "position:relative;display:inline-block;*display:inline;*zoom:1;";
            // 渐变方向
            // num = ele.scrollWidth;
            num = ele.scrollHeight;
            font = ele.innerHTML;
            var color;
            for (var i = 0; i <= num; i++) {
                var j = i + 1;

                if (i < (num / 20 * 4)) {
                    color = num & i * 20
                } else if (i < (num / 20 * 14)) {
                    color = num & i / 2
                } else if (i < (num / 20 * 16)) {
                    color = num & i / 2
                } else if (i >= (num / 20 * 16)) {
                    color = num
                }

                r = s.r + Math.round(v.r / num * color);
                g = s.g + Math.round(v.g / num * color);
                b = s.b + Math.round(v.b / num * color);
                var iObj = document.createElement(t);
                iObj.innerHTML = font;
                // 渐变方向裁剪
                // iObj.style.clip = "rect(auto " + j + "px auto " + i + "px)";
                iObj.style.clip = "rect(" + i + "px auto " + j + "px auto )";
                iObj.style.color = "rgb(" + r + "," + g + "," + b + ")";
                iObj.style.position = "absolute";
                iObj.href = href;
                iObj.style.fontStyle = "normal";
                iObj.style.left = iObj.offsetLeft;

                iObj.style.top = iObj.offsetTop;
                ele.appendChild(iObj);
            }
        },
        check: function(c) {
            var reg = /^#[a-fA-F0-9]{6}-#[a-fA-F0-9]{6}$/;
            if (reg.test(c)) return {
                s: this.slip(c.split("-")[0]),
                e: this.slip(c.split("-")[1])
            }
            return false;
        },
        init: function(tag) {
            if (tag) {
                for (var i = 0; i < tag.t.length; i++) {
                    var clips = this.$name("clip:g", tag.t[i]);
                    for (var j = 0; j < clips.length; j++) {
                        var self = clips[j];
                        var rel = self.getAttribute("rel");
                        if (rel && this.check(rel)) {
                            this.colorful(self, this.check(rel).s, this.check(rel).e);
                        }
                    }
                }
            }
        }
    }
};
clip2.gradient().init({
    t: [".text-color"]
});