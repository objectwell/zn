

// 页面渲染
function renderSort(arr, ele, url) {

    if (arr && arr.length > 0) {
        $.each(arr, function (i, item) {

            var item = item;
            var type = item.type;

            if (!type) {
                return false
            }

            if (type === "radio" || type === "checkbox") {
                renderChoice(item, ele)
            } else if (type === "text") {
                renderText(item, ele)
            } else if (type === "range") {
                renderRange(item, ele)
            } else if (type === "select") {
                renderSelect(item, ele, i)
            } else if (type === "radioImg") {
                renderRadioImg(item, ele, url)
            }

        })
    }
}

function renderText(obj, ele) {
    var item = obj;
    var title = item.title,
        answers = item.answers,
        type = item.type,
        questionNum = item.questionNum,
        require = item.required,
        textValue = item.textValue,
        data = item.data;
    var answers = title.split("_");
    var tip = $('<h6 class="question" title="' + questionNum + '" questionText="' + title + '"> </h6> ');
    if (textValue && textValue.length > 0) {
        if (require) {
            tip.attr("required", true)
            $.each(answers, function (i, str) {
                var str = str;
                if (i !== (answers.length - 1)) {
                    if(i===0){
                        var labelInput = '<label>' + questionNum + ".  " + str + '<input type="text" name="' + questionNum + '-' + i + '" class="text_answer answered_text " lay-verify="required|number" value=' + textValue[i] + '></label> <span class="transparent0">_</span> ';
                        tip.append(labelInput);
                    }else {
                        var labelInput = '<label>' + str + '<input type="text" name="' + questionNum + '-' + i + '" class="text_answer answered_text " lay-verify="required|number" value=' + textValue[i] + '></label> <span class="transparent0">_</span> ';
                        tip.append(labelInput);
                    }
                } else {
                    tip.append(str)
                }
            })
        } else {
            $.each(answers, function (i, str) {
                var str = str;
                if (i !== (answers.length - 1)) {
                    if(i===0){
                        var labelInput = '<label>' + questionNum + ".  " + str + '<input type="text" name="' + questionNum + '-' + i + '" class="text_answer answered_text " value=' + textValue[i] + '></label> <span class="transparent0">_</span> ';
                        tip.append(labelInput);
                    }else {
                        var labelInput = '<label>'+ str + '<input type="text" name="' + questionNum + '-' + i + '" class="text_answer answered_text " value=' + textValue[i] + '></label> <span class="transparent0">_</span> ';
                        tip.append(labelInput);
                    }
                    
                } else {
                    tip.append(str)
                }
            })
        }

    } else {
        if (require) {
            $.each(answers, function (i, str) {
                var str = str;
                if (i === 0) {
                    var labelInput = '<label>' + questionNum + ".  " + str + '<input type="text" name="' + questionNum + '-' + i + '" class="text_answer " lay-verify="required|number"/></label> <span class="transparent0">_</span> ';
                    tip.append(labelInput);
                }
                else if (i !== (answers.length - 1)) {
                    var labelInput = '<label>' + str + '<input type="text" name="' + questionNum + '-' + i + '" class="text_answer " lay-verify="required|number"/></label> <span class="transparent0">_</span> ';
                    tip.append(labelInput);
                } else {
                    tip.append(str)
                }
            })
        } else {
            $.each(answers, function (i, str) {
                var str = str;
                if (i === 0) {
                    var labelInput = '<label>' + questionNum + ".  " + str + '<input type="text" name="' + questionNum + '-' + i + '" class="text_answer "/></label> <span class="transparent0">_</span> ';
                    tip.append(labelInput);
                } else if (i !== (answers.length - 1)) {
                    var labelInput = '<label>' + str + '<input type="text" name="' + questionNum + '-' + i + '" class="text_answer " /></label> <span class="transparent0">_</span> ';
                    tip.append(labelInput);
                } else {
                    tip.append(str)
                }
            })
        }

    }

    itemHtml = $('<li class="layui-form-item w50" itemType="' + type + '"><hr class="layui-bg-orange"></li>');
    itemHtml.prepend(tip)
    ele.append(itemHtml);
}

function renderChoice(obj, ele) {
    var item = obj;
    var title = item.title,
        answers = item.answers,
        type = item.type,
        questionNum = item.questionNum,
        required = obj.required,
        data = item.data,
        checked = item.checked;

    var itemHtml = $('<li class="layui-form-item" itemType="' + type + '">'
        + '<p class="question" title="' + questionNum + '" questionText="' + title + '">' + questionNum + ".  " + title + '</p>'
        + '<div class="layui-input-block answer_box  ' + type + 'Verify verify">'
        + '</div>'
        + '<hr class="layui-bg-orange">'
        + '</li>');
    var $answerBox = itemHtml.find(".answer_box");
    if (answers && answers.length > 0) {

        if (required) {
            $answerBox.attr("required", required)
            $.each(answers, function (j, answer) {
                var answer = answer;
                var answerText = answer.str,
                    answerValue = answer.value,
                    checked = answer.checked,
                    inputText = answer.inputText;

                var $input = $('<input type="' + type + '" name="' + questionNum + '" value="' + answerValue + '" title="' + answerText + '" lay-skin="primary" lay-verify="choiceVerify">')
                if (checked) {

                    // $answerBox.append($('<input type="' + type + '" name="' + questionNum + '" value="' + answerValue + '" title="' + answerText + '" lay-skin="primary" checked lay-verify="choiceVerify">'))
                    $input.attr("checked", "checked")
                }
                $answerBox.append($input)

                if (inputText) {

                    if (answer.answerInputText) {
                        var labelInpt = $('<input type="text"  class="text_answer answered_text" value=' + answer.answerInputText + '>').appendTo($answerBox)
                    } else {
                        var labelInpt = $('<input type="text"  class="text_answer answered_text" >').appendTo($answerBox)

                    }

                }

            });
        } else {
            $.each(answers, function (j, answer) {
                var answer = answer;
                var answerText = answer.str,
                    answerValue = answer.value,
                    checked = answer.checked;
                inputText = answer.inputText;
                var $input = $('<input type="' + type + '" name="' + questionNum + '" value="' + answerValue + '" title="' + answerText + '" lay-skin="primary" >')

                if (checked) {
                    // $answerBox.append($('<input type="' + type + '" name="' + questionNum + '" value="' + answerValue + '" title="' + answerText + '" lay-skin="primary" checked lay-verify="choiceVerify">'))
                    $input.attr("checked", "checked")
                }
                $answerBox.append($input)
                if (inputText && answerValue == 98) {

                    if (answer.answerInputText) {
                        var labelInpt = $('<input type="text"  class="text_answer answered_text" value=' + answer.answerInputText + '>').appendTo($answerBox)
                    } else {
                        var labelInpt = $('<input type="text"  class="text_answer answered_text" >').appendTo($answerBox)

                    }

                }

            });
        }


        ele.append(itemHtml);

        if (data && data.length) {
            $answerBox.find("input").attr("lay-filter", "filter_ul");
            $.each(data, function (k, lis) {

                var list = lis;
                var listData = list.data,
                    listSelectValue = (list.selectValue);
                if (listSelectValue) {
                    listSelectValue = listSelectValue.join("-");
                    var cel = $('<ul class=" children_ul layui-hide layui-anim layui-anim-up clearfix" selectValue="' + listSelectValue + '"></ul>');

                    itemHtml.append(cel);
                    var ipts = itemHtml.find(".answer_box input");
                    $.each(ipts, function (index, input) {
                        var $input = $(input);

                        if ($input.prop("checked")) {
                            cel.removeClass("layui-hide")
                        }
                        // if ($input.val() === listSelectValue) {
                        //     if ($input.prop("checked")) {
                        //         cel.removeClass("layui-hide")
                        //     }
                        // }
                    })

                    renderSort(listData, cel);
                }


            })
        }
    }
}

function renderRange(obj, ele) {
    var minNum = obj.min,
        maxNum = obj.max,
        other = obj.other,
        title = obj.title,
        questionNum = obj.questionNum;

    itemHtml = $('<li class="layui-form-item" itemType="range">'
        + '<p class="question" title="' + questionNum + '" question="' + title + '">' + questionNum + ".  " + title + '</p>'
        + '<div class="layui-input-block answer_box margin0">'
        + '</div>'
        + '<hr class="layui-bg-orange">'
        + '</li>')


    $answerBox = itemHtml.find(".answer_box");
    var $rangeHtml = $(' <input type="range" value="0" min="' + minNum + '" max="' + maxNum + '"  title="拖拽选取值"  class="range" />').appendTo($answerBox);
    var $spanRangeVal = $('<span id="range' + questionNum + '" class="range_span">0</span>').appendTo($answerBox);
    var value = obj.value;
    if (value) {
        $rangeHtml.val(value);
        $spanRangeVal.text(value)
    }
    // 使用steps后 此方法不触发,已写在外部
    // $rangeHtml.on("change", function () {

    //     $spanRangeVal.text($(this).val())

    // })
    if (other) {
        if (other.checked) {
            $answerBox.append('<input type="checkbox" name="' + questionNum + '" value="' + other.value + '" title="' + other.str + '" lay-skin="primary" checked>')

        } else {
            $answerBox.append('<input type="checkbox" name="' + questionNum + '" value="' + other.value + '" title="' + other.str + '" lay-skin="primary">')

        }

    }

    ele.append(itemHtml);
}

function renderSelect(obj, ele, index) {
    var questionNum = obj.questionNum,
        answers = obj.answers,
        title = obj.title,
        type = obj.type,
        textValue = obj.textValue,
        required = obj.required,
        linkageType = obj.linkageType,
        dataValue = obj.dataValue;
    var setData = "";
    if (linkageType === "proMunCounty") {
        setData = pLinkage;
    } else if (linkageType === "nation") {
        setData = nationData;
    }

    if (textValue) {
        var $itemHtml = $('<li class="layui-form-item" itemType="' + type + '" linkageType="' + linkageType + '" setData=' + JSON.stringify(setData) + ' dataValue = ' + dataValue + ' textStr = ' + textValue + '>'
            + '<p class="question" title="' + questionNum + '" questionText="' + title + '" required=' + required + '>' + questionNum + ".  " + title + '</p>'
            + '<div class="answer_box">'
            + '<label class="layui-form-label">' + title + '</label>'
            + '<div class="layui-input-block">'
            + '<input type="text" id="select' + questionNum + '" class="layui-input select_input"  readonly="readonly">'
            + '</div>'
            + '</div>'
            + '<hr class="layui-bg-orange">'
            + '</li>');
    } else {
        var $itemHtml = $('<li class="layui-form-item" itemType="' + type + '" linkageType="' + linkageType + '" setData=' + JSON.stringify(setData) + '>'
            + '<p class="question" title="' + questionNum + '" questionText="' + title + '" required=' + required + '>' + questionNum + ".  " + title + '</p>'
            + '<div class="answer_box  ' + type + 'Verify verify">'
            + '<label class="layui-form-label">' + title + '</label>'
            + '<div class="layui-input-block">'
            + '<input type="text" id="select' + questionNum + '" class="layui-input select_input" readonly="readonly" lay-verify='+ required +'>'
            + '</div>'
            + '</div>'
            + '<hr class="layui-bg-orange">'
            + '</li>');
    }

    ele.append($itemHtml)

}

function renderRadioImg(obj, ele, url) {

    var item = obj;
    var title = item.title,
        answers = item.answers,
        type = item.type,
        questionNum = item.questionNum,
        required = obj.required,
        data = item.data,
        checked = item.checked;

    var itemHtml = $('<li class="layui-form-item" itemType="' + type + '">'
        + '<p class="question" title="' + questionNum + '" questionText="' + title + '">' + questionNum + ".  " + title + '</p>'
        + '<div class="layui-input-block answer_box  ' + type + 'Verify verify radio_img">'
        + '</div>'
        + '<hr class="layui-bg-orange">'
        + '</li>');
    var $answerBox = itemHtml.find(".answer_box");
    if (answers && answers.length > 0) {
        if (required) {
            $answerBox.attr("required", required)
            $.each(answers, function (j, answer) {
                var answer = answer;
                var answerText = answer.str,
                    answerValue = answer.value,
                    answerImgSrc = answer.img,
                    checked = answer.checked,
                    inputText = answer.inputText;


                if (answerImgSrc && answerImgSrc !== "") {
                    var $img = $('<div class="radio_item_img_box"> <img src="' + url + answerImgSrc + '" alt="' + answerText + '" class="raido_item_img"></div>').appendTo($answerBox);
                    var $input = $('<input type="radio" name="' + questionNum + '" value="' + answerValue + '" title="' + answerText + '" lay-skin="primary" lay-verify="choiceVerify">').appendTo($img);
                } else {
                    var $img = $('<div class="radio_item_img_box"></div>').appendTo($answerBox);
                    var $input = $('<input type="radio" name="' + questionNum + '" value="' + answerValue + '" title="' + answerText + '" lay-skin="primary" lay-verify="choiceVerify">').appendTo($img);

                }


                if (checked) {

                    // $answerBox.append($('<input type="' + type + '" name="' + questionNum + '" value="' + answerValue + '" title="' + answerText + '" lay-skin="primary" checked lay-verify="choiceVerify">'))
                    $input.attr("checked", "checked")
                }
                // $answerBox.append($input)

                // if (inputText) {

                //     if (answer.answerInputText) {
                //         var labelInpt = $('<input type="text"  class="text_answer answered_text" value=' + answer.answerInputText + '>').appendTo($answerBox)
                //     } else {
                //         var labelInpt = $('<input type="text"  class="text_answer answered_text" >').appendTo($answerBox)

                //     }

                // }

            });
        } else {
            $.each(answers, function (j, answer) {
                var answer = answer;
                var answerText = answer.str,
                    answerValue = answer.value,
                    checked = answer.checked;
                inputText = answer.inputText;
                var $input = $('<input type="radio" name="' + questionNum + '" value="' + answerValue + '" title="' + answerText + '" lay-skin="primary" >')

                if (checked) {
                    // $answerBox.append($('<input type="' + type + '" name="' + questionNum + '" value="' + answerValue + '" title="' + answerText + '" lay-skin="primary" checked lay-verify="choiceVerify">'))
                    $input.attr("checked", "checked")
                }
                $answerBox.append($input)
                if (inputText && answerValue == 98) {

                    if (answer.answerInputText) {
                        var labelInpt = $('<input type="text"  class="text_answer answered_text" value=' + answer.answerInputText + '>').appendTo($answerBox)
                    } else {
                        var labelInpt = $('<input type="text"  class="text_answer answered_text" >').appendTo($answerBox)

                    }

                }

            });
        }
        ele.append(itemHtml);

        if (data && data.length) {
            $answerBox.find("input").attr("lay-filter", "filter_ul");
            $.each(data, function (k, lis) {

                var list = lis;
                var listData = list.data,
                    listSelectValue = (list.selectValue);
                if (listSelectValue) {
                    listSelectValue = listSelectValue.join("-");
                    var cel = $('<ul class=" children_ul layui-hide layui-anim layui-anim-up clearfix" selectValue="' + listSelectValue + '"></ul>');

                    itemHtml.append(cel);
                    var ipts = itemHtml.find(".answer_box input");
                    $.each(ipts, function (index, input) {
                        var $input = $(input);
                        if ($input.val() === listSelectValue) {
                            if ($input.prop("checked")) {
                                cel.removeClass("layui-hide")
                            }
                        }
                    })

                    renderSort(listData, cel);
                }


            })
        }
    }


}


// 缓存web数据数据

// 单选与多选
function chooseStorage(el, arr) {
    var type = el.attr("itemtype");
    var questionNum = el.children(".question").attr("title"),
        title = el.children(".question").attr("questiontext"),
        answer_box = el.children(".answer_box"),
        chooses = answer_box.children("input:" + type + ""),
        required = answer_box.attr("required");
    var radioObj = {
        type: type,
        questionNum: questionNum,
        title: title,
        required: required,
        data: []
    };

    var answers = [];
    $.each(chooses, function (i, choose) {

        var $choose = $(choose);
        var itemAnswer = {
            checked: false,
            value: $choose.val(),
            str: $choose.attr("title")
        };
        if ($choose.prop("checked")) {
            if (parseInt($choose.val()) === 98) {
                var $answerObj = $choose.parents(".answer_box");
                var inputText = $answerObj.find(".answered_text");
                if (inputText.length > 0) {
                    itemAnswer.inputText = true;
                    itemAnswer.answerInputText = inputText.val();
                }

            }
            itemAnswer.checked = true;
        }
        answers.push(itemAnswer)
    })
    radioObj.answers = answers;

    var childUl = el.children(".children_ul");

    var ulLength = childUl.length;

    if (ulLength > 0) {
        $.each(childUl, function (i, ul) {
            var $ul = $(ul);
            var listSelectValue = $ul.attr("selectValue");
            var obj = {
                selectValue: listSelectValue.split("-"),
                data: []
            }
            recursionReadData($ul, obj.data)
            radioObj.data.push(obj);
        })



    }
    arr.push(radioObj)
    return arr;
}

// 文字
function textStorage(el, arr) {

    var type = el.attr("itemtype"),
        questionNum = el.children(".question").attr("title"),
        title = el.children(".question").attr("questionText"),
        textAnswers = el.children(".question").find(".text_answer"),
        required = el.children(".question").attr("required");
    answerArr = [];
    $.each(textAnswers, function (index, textIpt) {
        var $textIpt = $(textIpt);
        var text = $textIpt.val();
        answerArr.push(text)
    })
    arr.push({
        "title": title,
        "type": type,
        "questionNum": questionNum,
        "required": required,
        "textValue": answerArr
    })

    return arr
}

// range
function rangeStorage(el, arr) {
    var title = el.children(".question").attr("question");
    var questionNum = el.children(".question").attr("title");

    var $range = el.find(".answer_box .range");

    var $checkbox = el.find(".answer_box").children("input:checkbox");
    var checkboxObj = {};
    if ($checkbox.length > 0) {
        checkboxObj = {
            "value": $checkbox.val(),
            "str": $checkbox.attr("title"),
            checked: false
        }
        if ($checkbox.prop("checked")) {
            checkboxObj.checked = true
        }
    }

    arr.push({
        "title": title,
        "type": "range",
        "questionNum": questionNum,
        "min": $range.attr("min"),
        "max": $range.attr("max"),
        "value": $range.val(),
        "other": checkboxObj,
        "data": []
    })

    return arr

}


// select

function selectStorage(el, arr) {
    var type = el.attr("itemtype"),
        questionNum = el.children(".question").attr("title"),
        title = el.children(".question").attr("questiontext"),
        required = el.children(".question").attr("required"),
        linkageType = el.attr("linkageType"),
        textStr = el.attr("textStr"),
        dataValue = el.attr("dataValue");
    arr.push({
        "title": title,
        "type": type,
        "questionNum": questionNum,
        "required": required,
        "linkageType": linkageType,
        "textValue": textStr || "",
        "dataValue": dataValue || []
    })

    return arr
}

// radioImg 
function radioImgStorage(el, arr) {

    var type = el.attr("itemtype");
    var questionNum = el.children(".question").attr("title"),
        title = el.children(".question").attr("questiontext"),
        answer_box = el.children(".answer_box"),
        chooses = answer_box.find("input:radio"),
        required = answer_box.attr("required");
    var radioObj = {
        type: type,
        questionNum: questionNum,
        title: title,
        required: required,
        data: []
    };

    var answers = [];

    $.each(chooses, function (i, choose) {

        var $choose = $(choose);
        var imgSrc = $choose.parent().find("img").attr("src");

        var itemAnswer = {
            checked: false,
            value: $choose.val(),
            str: $choose.attr("title"),
            img: imgSrc
        };

        if (!imgSrc) {
            itemAnswer.text = $choose.attr("title") || "";
        }
        if ($choose.prop("checked")) {
            if (parseInt($choose.val()) === 98) {
                var $answerObj = $choose.parents(".answer_box");
                var inputText = $answerObj.find(".answered_text");
                if (inputText.length > 0) {
                    itemAnswer.inputText = true;
                    itemAnswer.answerInputText = inputText.val();
                }

            }
            itemAnswer.checked = true;
        }


        answers.push(itemAnswer)
    })
    radioObj.answers = answers;

    var childUl = el.children(".children_ul");

    var ulLength = childUl.length;

    if (ulLength > 0) {
        $.each(childUl, function (i, ul) {
            var $ul = $(ul);
            var listSelectValue = $ul.attr("selectValue");
            var obj = {
                selectValue: listSelectValue.split("-"),
                data: []
            }
            recursionReadData($ul, obj.data)
            radioObj.data.push(obj);
        })



    }
    arr.push(radioObj)
    return arr;
}

// 保存后台导出elxs数据

function saveData(items) {
    var lisArr = [];
    $.each(items, function (i, item) {
        var $item = $(item);
        var title = $item.children(".question").attr("questiontext");
        var questionNum = $item.children(".question").attr("title");
        var answersArr = [];
        var answers = "";
        var isCheclbox = false;
        var type = $item.attr("itemtype");
        var valueArr = [];

        // answerObj  存在说明不是text
        var answerObj = $item.find(".answer_box")[0];

        if (answerObj) {


            var inputArr = $(answerObj).find("input").not(".answered_text");
            $.each(inputArr, function (j, list) {

                var $list = $(list);


                if (type === "radio" || type === "checkbox" || type === "radioImg") {

                    if ($list.prop("checked")) {

                        if ($list.val() == 98) {
                            var inputText = $(answerObj).find(".answered_text").val();
                            answersArr.push($list.val() + "-" + inputText);
                        } else {

                            answersArr.push($list.val());
                        }

                    }


                } else if (type === "range") {
                    if ($list.siblings(".layui-form-checkbox").hasClass("layui-form-checked")) {
                        answersArr.push($list.next().next().val())
                    } else {
                        answersArr.push($list.val());
                    }

                } else if (type === "select") {
                    if ($item.attr("dataValue")) {
                        var selectArr = JSON.parse($item.attr("dataValue"));
                        var selectValue = selectArr[selectArr.length - 1];
                        answersArr.push(selectValue || "");
                    } else {
                        answersArr.push("")
                    }






                }
            })
            answers = answersArr.join("-")







        } else {
            var textAnswers = $item.find(".text_answer");

            if (textAnswers && textAnswers.length > 0) {
                var str = textAnswers.map(function (index, item) {
                    return $(item).val()
                }).get().join("-");

                valueArr.push(str)
            } else {
                valueArr.push("")
            }

            var answerText = valueArr.join("|");
            answers = answerText;


        }
        lisArr.push({
            replyNumber: questionNum,
            fullValue: answers
        })

    })


    return lisArr
}

// web结果保存

function webSave(forms, lis) {
    var formArrStorage = [];
    if (forms && forms.length > 0) {

        $.each(forms, function (i, form) {
            var $form = $(form);


            var formItem = {
                name: $(lis[i]).find("a").text().split(".")[1],
                data: []
            };

            var itemsUl = $form.children("ul");

            if (itemsUl.length > 0) {
                recursionReadData(itemsUl, formItem.data)
            }
            formArrStorage.push(formItem)
        })
    }

    return formArrStorage
}

function recursionReadData(ul, arr) {
    var items = $(ul).children("li")
    if (items && items.length > 0) {
        $.each(items, function (j, item) {
            var $item = $(item);
            var type = $item.attr("itemtype");
            if (type === "radio" || type === "checkbox") {
                chooseStorage($item, arr)
            } else if (type === "text") {
                textStorage($item, arr)
            } else if (type === "select") {
                selectStorage($item, arr)
            } else if (type === "range") {
                rangeStorage($item, arr)
            } else if (type === "radioImg") {
                radioImgStorage($item, arr)
            }
        })
    }
}

function getRequest() {
    var url = location.search; //获取url中"?"符后的字串   
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
// 选择题验证
var ZNverify = {
    choiceVerify: function (value, item) {
        var $item = $(item);
        var $answerBox = $item.parent();
        if ($answerBox.hasClass("verify")) {
            var flag = -1;
            var radios = $answerBox.find(".layui-form-radio");
            var checkboxs = $answerBox.find(".layui-form-checkbox");

            if (radios.length > 0) {

                $.each(radios, function (i, radio) {
                    var $item = $(radio);
                    if ($item.hasClass("layui-form-radioed")) {
                        flag = 1;
                    }
                })
            }

            if (checkboxs.length > 0) {


                $.each(checkboxs, function (i, checkbox) {
                    var $item = $(checkbox);

                    if ($item.hasClass("layui-form-checked")) {
                        flag = 1;
                    }
                })
            }
            if (flag < 0) {

                return ($answerBox.prev().attr("title") + "题为必选题,请选择作答")
            }
        }
    }

}




