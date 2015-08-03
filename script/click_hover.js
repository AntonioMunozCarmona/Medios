/* ================================================================ 
This copyright notice must be untouched at all times.

The original version of this script and the associated (x)html
is available at http://www.stunicholls.com/menu/tree_frog_horizontal.html
Copyright (c) 2005-2007 Stu Nicholls. All rights reserved.
This script and the associated (x)html may be modified in any 
way to fit your requirements.
=================================================================== */
function mostrar_hora()
{	
// Cogemos el objeto que mostrará la fecha
	var fechastring = document.getElementById("fecha");
	//Creamos una variable y le asignamos la fecha
	var d = new Date();
	//Creamos variables para recoger horas, minutos y segundos
	var diaMes = d.getDate();
	var diaSem = d.getDay();
	if (diaSem==0){ var CdiaSem="Domingo";}
	if (diaSem==1){ var CdiaSem="Lunes";}
	if (diaSem==2){ var CdiaSem="Martes";}
	if (diaSem==3){ var CdiaSem="Miércoles";}
	if (diaSem==4){ var CdiaSem="Jueves";}
	if (diaSem==5){ var CdiaSem="Viernes";}
	if (diaSem==6){ var CdiaSem="Sábado";}

	var mes = d.getMonth();
	if (mes==0){ var Cmes="Enero";}
	if (mes==1){ var Cmes="Febrero";}
	if (mes==2){ var Cmes="Marzo";}
	if (mes==3){ var Cmes="Abril";}
	if (mes==4){ var Cmes="Mayo";}
	if (mes==5){ var Cmes="Junio";}
	if (mes==6){ var Cmes="Julio";}
	if (mes==7){ var Cmes="Agosto";}
	if (mes==8){ var Cmes="Septiembre";}
	if (mes==9){ var Cmes="Octubre";}
	if (mes==10){ var Cmes="Noviembre";}
	if (mes==11){ var Cmes="Diciembre";}

	var ano = d.getFullYear();
	//Creamos una variable y le asignamos la cadena de presentación concatenando los valores anteriores
	var reloj = CdiaSem  + ", " + diaMes + " de "+ Cmes + " de " + ano +".";
//asgnamos el valor de esta cadena obtenida por concatenación como contenido del objeto que muestra la hora
	fechastring.innerHTML = reloj;
 }

clickMenu = function(menu) {
	
	mostrar_hora();
	var borrador = document.getElementById("texto");
	var usado = document.getElementById("menu");
	borrador.style.opacity = 1;
	borrador.style.transition = "opacity 1s";

	function opaco(){
		borrador.style.opacity = 0;
	}
	usado.addEventListener("click", opaco , false);


	var getEls = document.getElementById(menu).getElementsByTagName("LI");
	var getAgn = getEls;

	for (var i=0; i<getEls.length; i++) {
			getEls[i].onclick=function() {
				for (var x=0; x<getAgn.length; x++) {
				getAgn[x].className=getAgn[x].className.replace("unclick", "");
				getAgn[x].className=getAgn[x].className.replace("click", "unclick");
				}
			if ((this.className.indexOf('unclick'))!=-1) {
				this.className=this.className.replace("unclick", "");;
				}
				else {
				this.className+=" click";
				}
			}
			getEls[i].onmouseover=function() {
				this.className+=" hover";
			}
			getEls[i].onmouseout=function() {
				this.className=this.className.replace("hover", "");
			}
		}
	}