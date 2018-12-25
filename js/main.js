$(document).ready(function() {

	// Scroll2id - плавная прокрутка по ссылкам внутри страницы
	$("nav a,a[href='#top'],a[rel='m_PageScroll2id'],a.PageScroll2id").mPageScroll2id({
		highlightSelector:"nav a"
	});

	// MixItUp2 - фильтр-сортировщик работ в портфолио
	$('#portfolio-projects').mixItUp();

	// Переключение активной ссылки в фильтре
	var filter_btn = $ ('.filter-block__button');  // переменная не активной ссылки
	var class_active = 'filter-block__button--active';  // переменная активной ссылки

	  // Фильтр работ
	  filter_btn.on('click', function (e) {
	  	e.preventDefault ();
	  	$(filter_btn).removeClass(class_active);
	  	$(this).addClass(class_active);
	  });

	// FancyBox - galery
	$(".fancybox").fancybox({
			// Default - with fix from scroll to top
			helpers: {
				overlay: {
					locked: false
				}
			}
		});
	// End of FancyBox - galery

	// jQuery Validate - скрипт проверки формы на заполнение
	$('#contact-form').validate({
		rules: {
			name: { required: true },
			email: { required: true, email: true },
			// skype: { required: true },
			// phone: { required: true },
			message: { required: true }
		},
		messages: {
			name: "Пожалуйста, введите ваше имя",
			email: {
				required: "Пожалуйста, введите ваш email",
				email: "Email адрес должен быть в формате name@domain.com. Возможно вы ввели email с ошибкой."
			},
			message: "Пожалуйста, введите текст вашего сообщения"
		},

		submitHandler: function(form) {
		  ajaxFormSubmit();
		}

	})

	// Функция AJAX запрса на сервер
	function ajaxFormSubmit(){
		var string = $("#contact-form").serialize(); // Соханяем данные введенные в форму в строку. 

		// Формируем ajax запрос
		$.ajax({
			type: "POST", // Тип запроса - POST
			url: "php/mail.php", // Куда отправляем запрос
			data: string, // Какие даные отправляем, в данном случае отправляем переменную string
			
			// Функция если все прошло успешно
			success: function(html){
				$("#contact-form").slideUp(800);
				$('#answer').html(html);
			}
		});

		// Чтобы по Submit больше ничего не выполнялось - делаем возврат false чтобы прервать цепчку срабатывания остальных функций
		return false; 
	}

});