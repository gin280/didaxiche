<template>
  <div class="tinymce">
    <editor id="tinymce" v-model="tinymceHtml" :init="init" />
  </div>
</template>

<script>
import 'tinymce/skins/ui/oxide/skin.min.css'
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/silver/theme'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/plugins/image'
import 'tinymce/plugins/imagetools'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
// import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
// import 'tinymce/plugins/colorpicker'
// import 'tinymce/plugins/textcolor'
// import lang from 'tinymce/skins/zh_CN.js'
// tinymce.addI18n('zh_CN', lang)
export default {
  name: 'Tinymce',
  components: { Editor },
  data() {
    return {
      tinymceHtml: '请输入内容',
      init: {
        language: 'zh_CN',
        skin_url: '/tinymce/skins/lightgray',
        height: 300,
        plugins: 'link lists image imagetools code table  wordcount ',
        toolbar:
          'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
        branding: false,
        selector: '#tinymce',
        images_upload_url: 'https://xxs.xyyun.co/api/wetch/ranking/uploads',
        images_upload_handler: function (blobInfo, succFun, failFun) {
          var xhr, formData
          var file = blobInfo.blob()// 转化为易于理解的file对象
          xhr = new XMLHttpRequest()
          xhr.withCredentials = false
          xhr.open('POST', 'https://xxs.xyyun.co/api/wetch/ranking/uploads')
          xhr.onload = function () {
            var json
            if (xhr.status !== 200) {
              failFun('HTTP Error: ' + xhr.status)
              return
            }
            json = JSON.parse(xhr.responseText)
            if (!json || typeof json.location !== 'string') {
              failFun('Invalid JSON: ' + xhr.responseText)
              return
            }
            succFun(json.location)
          }
          formData = new FormData()
          formData.append('file', file, file.name)// 此处与源文档不一样
          xhr.send(formData)
        }
      }
    }
  },
  mounted() {
    tinymce.init({})
  }
}
</script>
