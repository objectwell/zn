$(function () {
    const indexImgUrl = "./img/";
    let studentId = getRequest().studentId;
    if (studentId) {
        var $wizard = $("#wizard");
        var $questionName = $("#questionName");
        var $questionText = $("#questionText");
        $.get("./json/znUniversity.json", function (res) {
            if (res.err_code === 0) {
                var data = res.data;
                if (data && data.length > 0) {
                    $questionName.html("中国大学生健康调查")
                    $.each(data, function (i, item) {
                        var item = item;
                        var itemData = item.data;
                        if (itemData && itemData.length > 0) {
                            if (i === 0) {
                                var $section = $('<section>'
                                    + '<form class="layui-form" id="form_' + i + '">'
                                    + '<ul class="unversity_ul" id="unversity' + i + '"></ul>'
                                    + '</ul>'
                                    + '<div class="layui-input-block continue_box">'
                                    + '<button class="layui-btn continue_btn" lay-submit lay-filter="next">下一步</button>'
                                    + '</div>'
                                    + '</form>'
                                    + '</section>');
                                var $ul = $section.find(".unversity_ul");
                                renderSort(itemData, $ul ,indexImgUrl);
                                $wizard.append('<h2>' + item.name + '</h2>').append($section);
                            } else if (i === (data.length - 1)) {
                                var $section = $('<section>'
                                    + '<form class="layui-form" id="form_' + i + '">'
                                    + '<ul class="unversity_ul" id="unversity' + i + '"></ul>'
                                    + '</ul>'
                                    + '<div class="layui-input-block continue_box">'
                                    + '<button class="layui-btn continue_btn" lay-submit lay-filter="pre">上一步</button>'
                                    + '<button class="layui-btn continue_btn" lay-submit lay-filter="finish">完成</button>'
                                    + '</div>'
                                    + '</form>'
                                    + '</section>');
                                var $ul = $section.find(".unversity_ul");
                                renderSort(itemData, $ul ,indexImgUrl);
                                $wizard.append('<h2>' + item.name + '</h2>').append($section);
                            } else {

                                var $section = $('<section>'
                                    + '<form class="layui-form" id="form_' + i + '">'
                                    + '<ul class="unversity_ul" id="unversity' + i + '"></ul>'
                                    + '</ul>'
                                    + '<div class="layui-input-block continue_box">'
                                    + '<button class="layui-btn continue_btn" lay-submit lay-filter="pre">上一步</button>'
                                    + '<button class="layui-btn continue_btn" lay-submit lay-filter="next">下一步</button>'
                                    + '</div>'
                                    + '</form>'
                                    + '</section>');
                                var $ul = $section.find(".unversity_ul");
                                renderSort(itemData, $ul, indexImgUrl);
                                $wizard.append('<h2>' + item.name + '</h2>').append($section);

                            }

                        }



                    })

                }

                

            };
            // steps
            $wizard.steps({
                headerTag: "h2",
                bodyTag: "section",
                transitionEffect: "fade",

                onStepChanging: function (event, currentIndex, newIndex) {

                    return true;
                },
                onStepChanged: function () {

                },
                onFinished: function () {

                },
                labels: {
                    cancel: "Cancel",
                    current: "current step:",
                    pagination: "Pagination",
                    finish: "完成",
                    next: "下一步",
                    previous: "上一步",
                    loading: "Loading ..."
                },
                startIndex: 5
            });

            // layui
            layui.config({
                base: "./js/layui/lay/mymodules/"
            }).use(['form', 'layer' ,'cascader'], function () {
                var form = layui.form;
                var layer = layui.layer;
                var cascader = layui.cascader;
                var $items = $(".layui-form-item");
               
                $.each($items,function(i,item){
                    var $item = $(item);
                    if($item.attr("itemtype")==="select"){
                        
                        var data = JSON.parse($item.attr("setData"));
                        var $selectInput = $item.find(".select_input");
                        
                        
                        cascader({
                            elem: $selectInput,
                            data: data,
                            success: function (data,elem,textStr) {
                                // console.log(data);
                                if(data.length>0){
                                    elem.attr("dataValue",JSON.stringify(data)).attr("textStr",textStr)
                                }
                            }
                        })
                    }
                })

               
                
                var continueLayer = layer.open({
                    type: 1,
                    content: $("#agree"),
                    title: "新生健康促进五年规划---调查问卷",
                    area: ['80%', '460px'],
                    shade: [0.8, '#fff'],
                    closeBtn: 0,
                    skin: 'ZNskin'
                })



                // 开启自定义验证
                form.verify(ZNverify)

                form.on('radio(filter_ul)', function (data) {
                    var value = data.value;
                    var obj = data.elem;
                    var uls = $(obj).parents(".answer_box").siblings(".children_ul");
                    var chindUls = uls.find(".children_ul");
                   
                    $.each(uls, function (i, ul) {
                        var $ul = $(ul);
                        var selectvalue = $ul.attr("selectvalue").split("-");
                        var flag = $.inArray((value + ""), selectvalue)
                        if (flag > -1) {
                            chindUls.addClass("layui-hide");
                            uls.addClass("layui-hide");
                            $ul.removeClass("layui-hide");
                            return false
                        } else {
                            $ul.find("input").prop("checked", false);
                            $ul.find(".layui-form-checkbox").removeClass(" layui-form-checked")
                            var textIpt = $ul.find("input");
                            $.each(textIpt, function (j, input) {
                                var itemIpt = $(input);
                                if (itemIpt.attr("type") === "text") {
                                    itemIpt.val("");
                                }
                            })
                            $ul.addClass("layui-hide");
                        }
                    })
                })
                // checkbox  form ul hide
                form.on('checkbox(filter_ul)', function (data) {
                    var value = data.value;
                    var obj = data.elem;
                    var uls = $(obj).parents(".answer_box").siblings(".children_ul");
                    var chindUls = uls.find(".children_ul");
                    
                    if (data.elem.checked) {
                        
                        $.each(uls, function (i, ul) {
                            var $ul = $(ul);
                            var selectvalue = $ul.attr("selectvalue").split("-");
                            var flag = $.inArray((value + ""), selectvalue)
                            if (flag > -1) {
                                chindUls.addClass("layui-hide");
                                uls.addClass("layui-hide");
                                $ul.removeClass("layui-hide");
                                return false
                            }else {
                                $ul.find("input").prop("checked", false);
                                $ul.find(".layui-form-checkbox").removeClass(" layui-form-checked")
                                var textIpt = $ul.find("input");
                                $.each(textIpt, function (j, input) {
                                    var itemIpt = $(input);
                                    if (itemIpt.attr("type") === "text") {
                                        itemIpt.val("");
                                    }
                                })
                                $ul.addClass("layui-hide");
                            }
                        })
                    } else {
                        $.each(uls, function (i, ul) {
                            var $ul = $(ul);
                            var selectvalue = $ul.attr("selectvalue");
                            if (selectvalue && selectvalue === value) {
                                $ul.find("input").prop("checked", false);
                                $ul.find(".layui-form-checkbox").removeClass(" layui-form-checked")
                                $ul.find("input").val("");
                                $ul.addClass("layui-hide");
                                return false
                            }
                        })
                    }
                })
               
                
                $(".range").on("change", function () {
                    var $self = $(this);
                    var $rangeSpan = $self.next(".range_span");
                    var thisValue = $self.val();
                    $rangeSpan.text(thisValue);
                })

                // 同意条款下一步
                form.on('submit(continue)', function (data) {
                    layer.close(continueLayer);
                    return false;
                });
                // 
                form.on('submit(next)', function (data) {
                    $("#wizard").steps("next")

                    return false


                });
                form.on('submit(pre)', function (data) {
                    $("#wizard").steps("previous")

                    return false


                });
                form.on('submit(finish)', function (data) {
                    
                    var loadIndex = layer.load(0, { shade: [0.1, "#fff"] });//执行加载效果
                    var $items = $(".layui-form-item").not(".post_btn");
                    
                    var storageForm = $(".wizard form");
                    var lis = $(".wizard .steps ul li");
                    
                    var storageData = webSave(storageForm, lis);
                    var postArr = saveData($items);
                    let saveDataUrl = GLOBAL_AJAX_URL.saveData;
                    let token = $.cookie('accessToken');
                    if (token && studentId) {
                        let saveData = {
                            replyJson: JSON.stringify(storageData),
                            researchJson: JSON.stringify({
                                student: {
                                    id: studentId
                                },
                                researchInvestigation: {
                                    id: "1",
                                },
                                data: postArr
                            }),

                        }

                        
                        

                        
                        
                        $.ajax({
                            type: "post",
                            url: saveDataUrl,
                            headers: {
                                Authorization: "Bearer " + token
                            },
                            data: saveData,
                            dataType: "json",
                            success: function (res) {
                                layer.closeAll();

                                if (res.code === "200") {
                                    layer.msg("完成调研,提交成功,感谢你的配合与支持", { time: 2000 }, function () {
                                        
                                        window.location.href = "./loginApp.html"
                                    })
                                } else {
                                    layer.msg(res.msg)
                                }



                            }
                        })
                    } else {
                        layer.msg("用户信息已过期,请新登录!", { time: 2000 }, function () {
                            window.location.href = "./loginApp.html"
                        });
                    }





                    return false


                });



            });

        })
    } else {
        window.location.href = "./loginApp.html"
    }








});