//Show Message Modal
function showmessage(header, body, footer) {
    $("#lblMessageHeader").text(header);
    $("#lblMessageBody").text(body);
    $("#lblMessageFooter").text(footer);
    $("#MessageModal").modal();
}

//Ajax Form Public
(function () {
    $("form.AjaxForm").ajaxForm({
        beforeSend: function () {
        },
        success: function (data) {
            //showmessage("", data.Message, "");
        },
        complete: function (xhr) {
        }
    });

})();

//Ajax Form Register
(function () {
    $("form.RegisterAjaxForm").ajaxForm({
        beforeSend: function () {
        },
        success: function (data) {
            if (data.Success) {
                $("#RegisterModal").modal("hide");
                showmessage("ثبت نام انجام شد", data.Message, "به برَنج خوش آمدید");
                $("#LoginModal").modal();
            }
            else
                $("#lblRegisterFooter").text(data.Message);
        }
    });

})();

//Ajax Form Login
(function () {
    $("form.LoginAjaxForm").ajaxForm({
        beforeSend: function () {
            $(".loadingtoggle").toggle();
        },
        success: function (data) {
            if (data.Success) {
                
                var htmltext = '<form action=\"/Account/LogOff\" id=\"logoutForm\" method=\"post\"></form>'
                    + '<a class="btn btn-sm btn-outline-light my-2 ml-sm-2" href="/Manage" title="Manage">پروفایل '
                    + data.Message +
                    ' !</a><a class="btn btn-sm" href="javascript:document.getElementById(\'logoutForm\').submit()">خروج</a>';
                //alert(htmltext);
                $("#divLoginPartial").html(htmltext);
                $("#LoginModal").modal("hide");
                //$("#DivRegisterLogin").html("");
            }
            else
                $("#lblLoginFooter").text(data.Message);
        },
        complete: function (xhr) {
            $(".loadingtoggle").toggle();
        }
    });

})();

//Form Login
(function () {
    $("form.LoginFactor").ajaxForm({
        beforeSend: function () {
            $(".loadingtoggle").toggle();
        },
        success: function (data) {
            if (data.Success) {
                location.reload();
            }
            else
                $("#lblLoginFooter").text(data.Message);
        },
        complete: function (xhr) {
            $(".loadingtoggle").toggle();
        }
    });

})();

//AddToFactor
(function () {
    $("form.AjaxForm").ajaxForm({
        success: function (data) {
            $("#ShoppingBag").text(data.Count);
            showmessage("افزودن به سبد خرید!", data.Message, "");
            $("#lblMessageFooter").append("  <a class=\"ShoppingCartMessage m-auto\" href=\"/Products/ShoppingCart\"> نهایی کردن خرید </a>");
        }
    });
})();

//State change for address
$("#StateId").change(function () {
    stateId = $("#StateId").val();
    getCiteis();
});
function getCiteis() {
    $("#cityId").find('option')
        .remove()
        .end();
    $.ajax({
        url: '/Manage/GetCities',
        type: 'POST',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            "stateId": stateId
        }),
        success: function (rigions) {
            $.each(rigions, function (i, rigion) {
                $("#cityId").append('<option value="' + rigion.Value + '">' +
                     rigion.Text + '</option>');
            });
        },
    });
}

//AddAddressSuccess
function AddAddressSuccess(data) {
    if (data.Success) {
        alert(data.Message);
    }
    else{
        showmessage("",data.Message,"");
    }
}


//tree ul
$(".treeul li:has(ul)").addClass("parent_li");
$(".treeul li.parent_li > .collaps").on("click", function (e) {
    var children = $(this).parent("li.parent_li").find(" > ul > li");
    if (children.is(":visible")) {
        children.hide("fast");
        $(this).attr("title", "گسترش این شاخه").addClass("fa-plus").removeClass("fa-minus");
    } else {
        children.show("fast");
        $(this).attr("title", "بستن این شاخه").addClass("fa-minus").removeClass("fa-plus");
    }
    e.stopPropagation();
});

//PreviewImage
function PreviewImage() {
    var oFReader = new FileReader();
    oFReader.readAsDataURL(document.getElementById("fileUpload").files[0]);
    oFReader.onload = function (oFrEvent) {
        document.getElementById("imgnewgallery").src = oFrEvent.target.result;
    };
    $("#fileUploadTitle").text(document.getElementById("fileUpload").files[0]);
};
function Previewlogo() {
    var oFReader = new FileReader();
    oFReader.readAsDataURL(document.getElementById("logoUpload").files[0]);

    oFReader.onload = function (oFrEvent) {
        document.getElementById("imglogo").src = oFrEvent.target.result;
    };
};

//=================================================================
// Parrent Form Submit
$(document).on("click", ".parentformsubmit", function () {
    var form = $(this).parents("form");
    form.submit();

});

//invertColor
function invertColor(hexTripletColor) {
    var color = hexTripletColor;
    color = color.substring(1); // remove #
    color = parseInt(color, 16); // convert to integer
    color = 0xFFFFFF ^ color; // invert three bytes
    color = color.toString(16); // convert to hex
    color = ("000000" + color).slice(-6); // pad with leading zeros
    color = "#" + color; // prepend #
    return color;
}
function invertRGB_ColorStr(oldColorStr) {
    //--- Special case
    if (oldColorStr === 'transparent') oldColorStr = 'rgb(255, 255, 255)';

    //--- Color is text in RGB format.  EG: rgb(1, 22, 255)
    var colorArray = oldColorStr.match(/\((\d+),\s?(\d+),\s?(\d+)\)/);

    var newColorStr = $.map(colorArray, function (byte, j) {
        if (!j) return null;

        //--- Invert a decimal byte.
        return Math.abs(255 - parseInt(byte));
    }
    ).join(',');

    return 'rgb(' + newColorStr + ')';
}
$(".control_indicator").each(function () {
    var c1 = $(this).css("background-color");
    var c2 = invertRGB_ColorStr(c1);
    $(this).find(".glyphicon").css("color", c2);

});

// show facor items
$(document).on("click", ".facor-details", function () {
    $(this).closest('tr').next().toggle('slow');

});
