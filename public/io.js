var socket = io("https://nodejs-frist.herokuapp.com/");
$(document).ready(function() {
    $("#sub").click(function() {
        socket.emit("send_data", $("#content").val());
        $('#content').val("");

    });
    $('#content').keypress(function(e) {
        if (e.which == 13) {
            socket.emit("send_data", $("#content").val());
            $('#content').val("");
        }
    });
    $('#user').keypress(function(e) {
        if (e.which == 13) {
            socket.emit("send_user", $("#user").val());
            $('#user').css('display', 'none');
        }
    });

    socket.on("data_send", function(data) {
        var s = "<h3>" + data.ur + ' : ' + data.ct + "</h3>";
        $("#dt").append(s);
        var scrollBottom = $('#dt').scrollTop() + $('#dt').height();
        $('#dt').animate({
            scrollTop: scrollBottom
            //scrollTop: $(".scroll-bottom").offset().top
        }, 'slow');
    });
});