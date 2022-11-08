
function createElement(parent,type,className){
	var elt = document.createElement(type)
	elt.className = className
	var parent = parent
	parent.append(elt)
	return elt

}

function createComplexElement(parent,type,className,idName,textContent){
	var elt = document.createElement(`${type}`)
	elt.className = className
	elt.id = idName
	elt.textContent = textContent
	parent.append(elt)
	return elt

}



function CreateSearchSection(){
	var cont = document.querySelector(".main-part")
	var searchContainer = createElement(cont,'div','search-section')
	
	var searchTitle = createComplexElement(searchContainer,"p",'s-title','','Search Section')
	
	var bookForm = createElement(searchContainer,'form','b-form')
	
	var titleLabel = createComplexElement(bookForm,"label",'','',"Book's Name")
	titleLabel.for = "b-title"
	var titleInput = createComplexElement(bookForm,"input",'b-title','','')
	titleInput.required = true
	titleInput.type = "text"
	titleInput.placeholder = "Ex:John"
	
	var chapterLabel = createComplexElement(bookForm,"label",'','',"Chapter")
	chapterLabel.for = "b-chapter"
	var chapterInput = createComplexElement(bookForm,"input",'b-chapter','','')
	chapterInput.required = true
	chapterInput.type = "number"
	chapterInput.min = 1
	chapterInput.placeholder = "Ex:3"
	
	var verseLabel = createComplexElement(bookForm,"label",'','',"Verse")
	verseLabel.for = "b-verse"
	var verseInput = createComplexElement(bookForm,"input",'b-verse','','')
	verseInput.required = true
	verseInput.type = "text"
	verseInput.min = 1
	verseInput.placeholder = "Ex:16 or 1-16"
	
	
	var SubmitBtn = createComplexElement(bookForm,"button",'submit-btn','',"Search")
	SubmitBtn.type = "submit"
	SubmitBtn.addEventListener("click",(e)=>{
	
		if(titleInput.validity.valid && chapterInput.validity.valid && verseInput.validity.valid){
			
			// console.log("object");
			e.preventDefault()
			searchContainer.remove()
			apiSearch(titleInput.value,chapterInput.value,verseInput.value)
			let tempText = createComplexElement(cont,"p",'load','',"Loading...")
			
		}
		else{
		}
	})
}


function apiSearch(book,chapter,verse){
	var body = document.querySelector('body');
	// fetch('https://bible-api.com/matthew+3:1-16?verse_numbers=true', {mode: 'cors'})
	fetch(`https://bible-api.com/${book}+${chapter}:${verse}?verse_numbers=true`, {mode: 'cors'})
	.then(function(response) {
	return response.json();
	})
	.then(function(response) {
		console.log('here is the response!');
		if(response.verses){

			let tTxt = document.querySelector(".load")
			if(tTxt){
				tTxt.remove()
			}
			let oldVerses = document.querySelectorAll(".verse")
			for(let i = 0;i<oldVerses.length;i++){
				let tpV = oldVerses[i]
				tpV.remove()
			}


			var cont = document.querySelector(".main-part")
			let title = document.createElement("p")
			title.className = "verse"
			title.style.fontStyle = "italic"
			title.textContent = `${book}, Chapter ${chapter}, verse ${verse}`
			cont.append(title)
			for(i=0;i<response.verses.length;i++){
				let pp = document.createElement("p")
				pp.className = "verse"
				pp.textContent = `${response.verses[i].verse}-` + response.verses[i].text
				cont.append(pp)

			}

		}
		
		else{
			let tempText = createComplexElement(cont,"p",'load','',"There's an error somewhere!Try again")
		}
		// console.log(response);
	})
	.catch(function(response) {
		var cont = document.querySelector(".main-part")
		let tempText = createComplexElement(cont,"p",'err','',"There's an error somewhere!Try again")
		let tTxt = document.querySelector(".load")
		if(tTxt){
			tTxt.remove()
		}
	})
}


var searchBtn = document.querySelector(".nav-btn")

searchBtn.addEventListener("click",()=>{
	let sCont = document.querySelector(".search-section")
	let tTxt = document.querySelector(".load")
	let errTxt = document.querySelector(".err")
	let mPart = document.querySelector("main-part")
	if(tTxt){
		tTxt.remove()
	}
	if(errTxt){
		errTxt.remove()
	}
	if(!sCont){
		CreateSearchSection()
	}
	let oldVerses = document.querySelectorAll(".verse")
	for(let i = 0;i<oldVerses.length;i++){
		let tpV = oldVerses[i]
		tpV.remove()
	}

	
})


CreateSearchSection()