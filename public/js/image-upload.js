function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        $('#myProgress').css('display', 'block');
        $('.image-uploader').css('background', 'url(../img/loading.gif) no-repeat center center');

        reader.onload = function (e) {
            $('.preview').attr('src', e.target.result);
            $('#myProgress').css('display', 'none');
            $('#myBar').css('width', "0%");
        }

        reader.onprogress = function(e) {
            if (e.lengthComputable) {
                var progress = parseInt( ((e.loaded / e.total) * 100), 10 );
                $('#myBar').css('width', progress + "%");
                //console.log(progress + "%")
            }
        }

        reader.readAsDataURL(input.files[0]);
    }
}

$('#project-img').change(function(){
    readURL(this);
});

// $('#upload-button').on("click", function(){
//     this.value = "Uploading...";
// });
