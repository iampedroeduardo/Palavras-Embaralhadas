function SorteiaTema(){
	n=Math.floor(Math.random()*temas.length);
	tema=temas[n];
	temas.splice(n,1);
}
function Testa(palavra,embaralhada){
	cont=0;
	for(c=0;c<palavra.length;c++){
		if(palavra[c]==embaralhada[c]){
			cont++
		}
	}
	return cont;
}
function Sorteia(min,max){
	v=[];
	for(c=min;c<=max;c++){
		v.push(c);
	}
	console.log(v);
	n=Math.floor(Math.random()*v.length);
	return v[n];
}
function Embaralha(){
	palavras=tema[1]+tema[2]+tema[3];
	embaralhada=palavras;
	if(dif=="facil"){
		min=7;
		max=10;
	}
	else if(dif=="medio"){
		min=3;
		max=5;
	}
	else if(dif=="dificil"){
		min=0;
		max=3;
	}
	certas=Sorteia(min,max);
	do{
		n1=Math.floor(Math.random()*embaralhada.length);
		n2=Math.floor(Math.random()*embaralhada.length);
		if(n2>n1){
			embaralhada=embaralhada.substring(0,n1)+embaralhada[n2]+embaralhada.substring(n1+1,n2)+embaralhada[n1]+embaralhada.substring(n2+1);
		}
		else if(n1>n2){
			embaralhada=embaralhada.substring(0,n2)+embaralhada[n1]+embaralhada.substring(n2+1,n1)+embaralhada[n2]+embaralhada.substring(n1+1);
		}
	}while(Testa(palavras,embaralhada)!=certas)
	embaralhadas[0]=embaralhada.substr(0,tema[1].length);
	embaralhadas[1]=embaralhada.substr(tema[1].length,tema[2].length);
	embaralhadas[2]=embaralhada.substr(tema[1].length+tema[2].length,tema[3].length);
}
function CapsLock(){
	for(c=0;c<temas.length;c++){
		for(i=0;i<4;i++){
			temas[c][i]=temas[c][i].toUpperCase();
		}
	}
}
function GeraBotoes(){
	div=document.getElementById("jogo");
	for(c=0;c<3;c++){
		for(i=0;i<embaralhadas[c].length;i++){
			botao=document.createElement("input");
			on="posicoes.push(["+c+","+i+"]);Destaca();if(posicoes.length%2==0){Troca();}";
			botao.setAttribute("onclick",on);
			botao.setAttribute("type","button");
			botao.setAttribute("value",embaralhadas[c][i]);
			botao.setAttribute("id",""+c+i);
			botao.setAttribute("class","botao");
			botao.style.border="1px solid red";
			div.appendChild(botao);
		}
		br=document.createElement("br");
		div.appendChild(br);
	}
	document.getElementById("dica").innerHTML="Dica: "+tema[0];
	dica=document.getElementById("titulo");
	botao=document.createElement("input");
	botao.setAttribute("type","button");
	botao.setAttribute("id","instrucoes");
	botao.setAttribute("value","?");
	botao.setAttribute("class","instr")
	botao.setAttribute("onclick","Instrucoes();")
	dica.appendChild(botao);
	TestaLetras();
	dif=document.getElementById("dificuldade");
	dif.parentNode.removeChild(dif);
}
function Destaca(){
	pala=posicoes[posicoes.length-1][0];
	pos=posicoes[posicoes.length-1][1];
	botao=document.getElementById(""+pala+pos);
	botao.style.border="2px solid red";
}
function Troca(){
	pala1=posicoes[posicoes.length-1][0];
	pos1=posicoes[posicoes.length-1][1];
	pala2=posicoes[posicoes.length-2][0];
	pos2=posicoes[posicoes.length-2][1];
	botao1=document.getElementById(""+pala1+pos1);
	botao2=document.getElementById(""+pala2+pos2);
	letra1=botao1.value;
	letra2=botao2.value;
	console.log(letra1);
	console.log(letra2);
	botao1.setAttribute("value",letra2);
	botao2.setAttribute("value",letra1);
	console.log(embaralhadas);
	setTimeout(()=>{botao1.style.border="1px solid red";botao2.style.border="1px solid red";},500);
	setTimeout(TestaLetras,500);
	setTimeout(TestaFinal,500);
}
function TestaFinal(){
	tof=false
	for(c=0;c<3;c++){
		for(i=0;i<tema[c+1].length;i++){
			botao=document.getElementById(""+c+i);
			if(botao.value!=tema[c+1][i]){
				tof=true;
			}
		}
	}
	if(tof==false){
		tela=[
            '<div class="container">',
            '    <div class="box">',
            '        <h1>Meus Parabéns! Você ganhou!</h1>',
            '        <a href="index.html"><button class="botao2">Jogar Novamente</button></a>',
            '    <div>',
            '</div>'
        ]
        setTimeout(()=>{document.querySelector("body").innerHTML=tela.join("\n")},500);
	}
}
function TestaLetras(){
	for(c=0;c<3;c++){
		for(i=0;i<tema[c+1].length;i++){
			botao=document.getElementById(""+c+i);
			if(botao.value==tema[c+1][i]){
				botao.style.border="2px solid lawngreen";
				botao.removeAttribute("onclick");
			}
		}
	}
}
function Instrucoes(){
	div=document.getElementById("jogo");
	if(document.getElementById("instr")==null){
		p=document.createElement("p");
		p.id="instr"
		texto=document.createTextNode("Você deve selecionar duas letras para trocarem de lugar a cada rodada. Se elas estiverem no lugar correto suas bordas ficarão verdes. Você ganha quando todas as palavras estiverem organizadas.");
		p.appendChild(texto);
		div.appendChild(p);
	}
	else{
		p=document.getElementById("instr");
		p.parentNode.removeChild(p);
	}
}
var temas=[["CHURRASCO","arroz","salada","picanha"],["FILMES","cinema","direcao","roteiro"],["MUSICA","batida","letra","performance"],["HARRY POTTER","rony","neville","hermione"],["MARVEL","groot","rocket","gilgamesh"],["BRASIL","samba","corrupcao","amazonia"],["TRABALHO","caneta","contrato","escrivaninha"],["PERCY JACKSON","deuses","semideus","acampamento"],["LIVRO","pagina","paragrafo","diagramacao"],["SENTIMENTOS","raiva","alegria","tristeza"]];
var tema, embaralhadas=[], posicoes=[];
CapsLock();
SorteiaTema();

