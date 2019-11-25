export default function template() {
  console.log("template JS loaded");

  (function () {
    'use strict';
    var reservaLanding = {
        _controller: {},

        pageSize: Math.max(document.documentElement.clientHeight - 40, window.innerHeight - 40 || 0),

        pageWidth: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),

        setup: function () {
            var _this = this;
            $(window).scroll(function () { _this.scrollHandler(_this); });

            $(document).ready(function () { _this.scrollHandler(_this); });
            
            this.getViewportSizing();

            console.log("entrei");
        },

        scrollHandler: function (_this) {
            var position = $(window).scrollTop();

            if(position === undefined)
                position = 0;

            //second page
            _this.setClass(position, ".second-page ", ".second-page .fadein-text", "appear");

            //third page
            _this.parallaxText(position, ".third-page", ".third-page .landing-page-content");

            //fourth page
            _this.setClass(position, ".fourth-page ", ".fourth-page .fadein-text", "appear");
            _this.setClass(position, ".fourth-page ", ".rectangle:first-child", 'top-rect');
            _this.setClass(position, ".fourth-page ", ".rect2", 'bottom-rect');

            //fifth transition
            _this.pinContainer(position, ".third-page", ".seventh-placeholder", ".fourth-page");
            _this.fadeinTextScene(position, ".fifth-page", ".fifth-fadein");

            if(_this.pageWidth > 600)
            {
                _this.createFifthPage(position);
                this.createHorizontalScene(position, ".fifth-page", ".sixth-page", ".fifth-placeholder");
                this.createHorizontalScene(position, ".sixth-page", ".seventh-page", ".sixth-placeholder");
                this.createHorizontalScene(position, ".seventh-page", ".eighth-page", ".seventh-placeholder");
                this.createHorizontalScene(position, ".eighth-page", ".nineth-page", ".eighth-placeholder");
                this.createHorizontalScene(position, ".nineth-page", ".eleventh-page", ".nineth-placeholder");
                this.createTwelfthPage(position);
            }

            this.fadeinTextScene(position, ".sixth-page", ".sixth-fadein");

            this.fadeinTextScene(position, ".seventh-page", ".seventh-fadein");

            this.fadeinTextScene(position, ".eighth-page", ".eighth-fadein");

            //brasil
            _this.setClass(position, ".thirteenth-page", ".brasil-full", "encher", (_this.pageSize * 0.1));
            _this.setClass(position, ".thirteenth-page", ".brasil .fadein-text", "appear", (_this.pageSize * 0.1));

            //fourteenth page
            _this.parallaxText(position, ".fourteenth-page", ".fourteenth-page .landing-page-content");

            //fiftheenth page
            _this.setClass(position, ".fifteenth-page ", ".fifteenth-page .fadein-text", "appear");

        },

        pinContainer: function (position, trigger, until, container){
            var offset = $(trigger).offset().top + this.pageSize;
            var duration = $(until).offset().top;

            if(position <= duration && position >= offset)
                $(container).css("position", "fixed");
            else if(position < offset && $(container).css("position") === "fixed")
                $(container).css("position", "relative");
        },

        parallaxText: function(position, trigger, element) {
            var offset = $(trigger).offset().top - (this.pageSize / 2);
            var duration = offset + this.pageSize;

            if(position <= duration && position >= offset)
            {
                var porc = Math.ceil(((100 * (position - offset)) / (duration - offset)) * 0.7);
                $(element).css("transform", 'translateY(-' + porc + '%)');
            }
            else if(position < offset)
                $(element).css("transform", 'translateY(0%)');
            else if(position > duration)
                $(element).css("transform", 'translateY(-70%)');
        },

        isPorcLessThanZero: function(porcStr) {
            return Number(String(porcStr).replace("px", "")) <= 0;
        },

        isPorcEqualHundred: function(porcStr) {
                return Number(String(porcStr).replace("px", "")) > 0;
        },

        createFifthPage: function (position) {
            var offset = $(".third-page").offset().top + this.pageSize;
            var duration = offset + this.pageSize;

            if(position <= duration && position >= offset)
            {
                var porc = 100 - Math.ceil(((100 * (position - offset)) / (duration - offset)));
                $(".fifth-page").css("left", porc + '%');
                $(".fifth-page .landing-page-content").css("left", porc + '%');
                $(".fifth-page").attr("passed", "true");
            }
            else if(position > duration)
            {
                $(".fifth-page").css("left", '0%');
                $(".fifth-page .landing-page-content").css("left", '0%');
                $(".fifth-page").attr("passed", "true")
            }
            else if(position < offset && $(".fifth-page").attr("passed") == "true")
            {
                $(".fifth-page").css("left", '100%');
                $(".fifth-page .landing-page-content").css("left", '100%');
                $(".fifth-page").attr("passed", "false");
            }
        },

        fadeinTextScene: function (position, container, trigger) {      
            var offset = $(trigger).offset().top + (this.pageSize * 0.8);

            if(position >= offset)
            {
                $(container + ' .fadein-text').addClass("appear");
                $(container + ' .page-fadein').addClass('page-fadein-back');
            }    
            else if(position < offset && $(container + ' .fadein-text').hasClass("appear"))
            {
                $(container + ' .fadein-text').removeClass("appear");
                $(container + ' .page-fadein').removeClass('page-fadein-back');   
            }
        },

        createTwelfthPage: function (position) {
            var offset = $(".twelfth-page").offset().top - (this.pageSize - 30);
            var duration = offset + this.pageSize;

            if(position <= duration && position >= offset)
            {
                var porc = Math.ceil(((100 * (position - offset)) / (duration - offset)));
                $(".eleventh-page").css("top", "calc(-" + porc + '% + 40px)');
                //$(".eleventh-page .landing-page-content").css("transform", "translateY(-" + (porc * 0.7) + '%)');
                $(".eleventh-page").attr("passedY", "true");
            }
            else if(position > duration)
            {
                $(".eleventh-page").css("top", '-100%');
                //$(".eleventh-page .landing-page-content").css("transform", 'translateY(-70%)');
                $(".eleventh-page").attr("passedY", "true");
            }
            else if(position < offset && $(".eleventh-page").attr("passedY") == "true")
            {
                $(".eleventh-page").css("top", 'calc(0% + 40px)');
                //$(".eleventh-page .landing-page-content").css("transform", 'translateY(0%)');
                $(".eleventh-page").attr("passedY", "false");
            }
        },

        createHorizontalScene: function (position, last, next, trigger) {
            var offset = $(trigger).offset().top + (this.pageSize / 2);
            var duration = offset + this.pageSize;

            if(position <= duration && position >= offset)
            {
                var porc = Math.ceil(((100 * (position - offset)) / (duration - offset)));

                $(last).css("left", "-" + porc + '%');
                $(next).css("left", (100 - porc) + '%');
                
                porc = porc * 0.1;

                $(last + " .landing-page-content").css("left", "-" + porc + '%');
                $(next + " .landing-page-content").css("left", (10 - porc) + '%');
                $(next).attr("passed", "true");
            }
            else if(position > duration)
            {
                $(next).css("left", '0%');
                $(next + " .landing-page-content").css("left", '0%');

                $(last).css("left", '-100%');
                $(last + " .landing-page-content").css("left", '-10%');
                $(next).attr("passed", "true");
            }
            else if(position < offset && $(next).attr("passed") == "true")
            {
                $(next).css("left", '100%');
                $(next + " .landing-page-content").css("left", '-10%');

                $(last).css("left", '0%');
                $(last + " .landing-page-content").css("left", '0%');  
                
                $(next).attr("passed", "false");
            }

        },

        setClass: function(position, trigger, element, cssClass, offset) {
            if(offset === undefined)
                offset = (this.pageSize * 0.2);

            if(position + offset >= $(trigger).offset().top && !$(element).hasClass(cssClass))
                    $(element).addClass(cssClass);
                else if($(element).hasClass(cssClass) && position + offset < $(trigger).offset().top)
                    $(element).removeClass(cssClass);
        },

        getViewportSizing: function() {
            var _this = this;
            var vh = (window.innerHeight - 40) * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);

            window.addEventListener('resize', () => {
                _this.scrollHandler(_this);
                var vh = (window.innerHeight - 40) * 0.01;
                document.documentElement.style.setProperty('--vh', `${vh}px`);
            });

            document.addEventListener('gesturestart', function (e) {
                var vh = (window.innerHeight - 40) * 0.01;
                document.documentElement.style.setProperty('--vh', `${vh}px`);
            });
        }
    };

    reservaLanding.setup();
  })();
}
