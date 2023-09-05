const tinyMceConfig = () => {
      tinymce.init({
        selector: '.article-content',
        plugins: 'lists advlist link image table code help wordcount',
        theme: 'silver',
        toolbar: 'undo redo | styleselect | bold italic underline | alignleft aligncenter alignright alignjustify lineheight | bullist numlist outdent indent | link image',
      });
};

export default tinyMceConfig;