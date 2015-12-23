/*!
 * After Load v.0.1 (beta) (http://rods.la/afterload)
 * by Alessandro Rods <alessandro@rodsmkt.com.br>
 * Christoffer Lucas <christoffer@solucoesformare.com>
 *
 * After Load é um Plugin jQuery que realiza o carregamento
 * de BLOCOS do template após todo o site estar carregado.
 * Isso agiliza o tempo de carregamento das páginas, já
 * que elementos como banners, por exemplo, são carregados
 * posteriormente.
*/

(function($){
	
	
    //iniciando o plugin
	$.fn.AfterLoad = function(config){
		
		var settings = $.extend( {
			
			//Path para a raiz onde o sistema será executado
			'path'		: window.location.origin,
			
      		//realiza o load apenas se a página estiver completamente carregada | default: true
			'afterLoad'	: true,
			
			//permite inserir páginas externas utilizando o protocolo http | default: false
      		'external' 	: false,
			
			//carrega o arquivo em um elemento específico na pgn | defult: this (elemento que fez a chamada)
			'loadInto'	: $(this), 
			
			//arquivo a ser carregado | default: valor passado no atributo "data-file" no elemento
			'src'		: this.data('file'),
			
			//arquivo de img (.gif) que aparece enquanto o bloco não é carregado.
			'loading'	: 'img/loading.gif',
			
			//se a instalação do sistema estiver em uma pasta no servidor | default: /
			'folder'	: '/'

    	}, config);
		

		
		
		/*
		 * var element
		 * o elemento da página onde o arquivo será
		 * carregado
		 *
		 * Se o LoadInTo for diferente de this, ele deve ser carregado
		 * em um elemento específico da página, assim é convertida a 
		 * string para um elemento DOM
		*/
		if (settings.loadInto != $(this))
			var element = $(settings.loadInto);
		else
			var element = settings.loadInto; // default $(this)
		
		
		
		/*
		 * var src
		 * o arquivo que deverá ser carregado
		 * deve ser especificado em um
		 * atributo "data-file", dentro do
		 * elemento onde será carregado
		 *
		 * é necessário montar o caminho completo do
		 * arquivo para não dar erro quando utilizado
		 * com URLs Amigávies
		*/
		if (!settings.external)
			var	src = settings.path + settings.folder + settings.src;
		else{	
			jQuery.get(settings.src, function(data){
				var src = data;
			});
		}
		
		
		
		/*
		 * Insere a img de loading enquanto o bloco de arquivo é carregado.
		*/
		var img_code = '<div style="text-align:center"><img src="' + settings.loading + '" /></div>';
		element.html(img_code);
		
	
		
		
		/*
		 * window.load
		 * os blocos começarão a ser carregados
		 * após o carregamento completo de toda
		 * a página
		*/
		if(settings.afterLoad){
			
			/*
			 * o arquivo é carregado apenas após todo o carregamento do site estar completo
			*/
			$(window).load(function(){
				
				/*
				 * element.load
				 * carrega os códigos do src para
				 * dentro do elemento informado
				*/
				element.load(src);
				
			}); //end window.load
		}else{
			
			/*
			 * o arquivo é carregado após o documento estar pronto
			 * este load ocorre após a compilação do HTML, junto com
			 * imagens, folhas de estilos e scripts .js
			*/			
			$(document).ready(function(){
				
				/*
				 * element.load
				 * carrega os códigos do src para
				 * dentro do elemento informado
				*/	
				element.load(src);
				
			}); //end window.load
		}//endelse
		
		
		
		/*
		 * remove o atributo "data-file" do elemento.
		 * apenas uma questão de ocultar o caminho do arquivo
		 * que será inserido na página
		*/
		element.removeAttr('data-file');
		
		
	}
})(jQuery);