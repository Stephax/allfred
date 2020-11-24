var submitting = false;
$(function() {
    $("#submit").click(function(e) {
        trySubmitEmail();
        e.preventDefault();
        return false;
    });
    $('#email').on('keypress', function(e) {
        if (e.which == 13) {
            trySubmitEmail();
            e.preventDefault();
            return false;
        } else {
            $(this).toggleClass('error', false);
        }
    });
    $('#email').on('keyup', function(e) {
        $(this).toggleClass('error', false);
    });

    $(window).on('resize', resizer);
    resizer();
})
$(window).load(function() {
    resizer();
});

function trySubmitEmail() {
    if (!submitting) {
        submitting = true;

        $('body').toggleClass('submitting', true);
        //$('#submit').toggleClass('loading', true);
        $('#email').attr('disabled', 'disabled');
        $("#email").toggleClass('error', false);

        $.ajax({
            type: 'POST',
            url: '/subscribe',
            dataType: 'json',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data: {
                email: $('#email').val()
            },
            success: function(data) {
                if (data.success) {
                    $('.form .beforesubmit').hide();
                    $('.form .aftersubmit').show();
                } else {
                    $('#email').removeAttr('disabled');
                    if (data.errors.length > 0) {
                        for (var i = 0; i < data.errors.length; i++) {
                            $("#" + data.errors[i]).toggleClass('error', true);
                        }
                    } else {
                        alert('A server error has occured.');
                    }
                }
            },
            error: function(xhr, type, exception) {
                $('#email').removeAttr('disabled');
                alert('There have been a server error, or there\'s a problem with your internet connection. Try to refresh the page.');
            },
            complete: function() {
                //$('#submit').toggleClass('loading', false);
                $('body').toggleClass('submitting', false);
                submitting = false;
            }
        });
    }
}

function resizer() {
    var _w_w = $(window).width();
    var _w_h = $(window).height();

    //...
}

console.log(_w_h);