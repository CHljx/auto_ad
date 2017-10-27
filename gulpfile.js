var gulp=require("gulp"),
	webserver = require('gulp-webserver');

gulp.task("server",function(){
	  gulp.src( './dest/' ) // ������Ŀ¼��./�����Ŀ¼��
        .pipe(webserver({ // ����gulp-webserver
           // livereload: true, // ����LiveReload
			//root:'./',
		    //host:'ljx.h5.com',
			port:8888,
            open: true // ����������ʱ�Զ�����ҳ
        }));
})