import { NODE_ELEMENTS, GROUPES } from "./constants.js"

export class Animation {
    static startAnimation(){
        NODE_ELEMENTS.get_all_cards().forEach(card => card.classList.add('animated'))
    }

    static startMovement(){
        const ul = NODE_ELEMENTS.ul_cards
        const coordinateUl = {x: ul.offsetWidth*1.5, y: ul.offsetHeight*1.5}

        NODE_ELEMENTS.get_all_cards().forEach(card => {
            
            card.style.left = card.offsetLeft + "px"
            card.style.top = card.offsetTop + "px"
            
            setTimeout(()=>{
                card.style.position = "absolute"
                
                card.style.left = ((coordinateUl.x + card.offsetWidth) /2 ) + "px"
                card.style.top = ((coordinateUl.y + card.offsetHeight) /2)  + "px"
            },2)
        })
    }

    static selectRandomCollab() {
        const allCollabs = []

        GROUPES.forEach(group => {
            allCollabs.push(...group.getCollaborateurs())
        })
        const randomIndex = Math.floor(Math.random() * allCollabs.length);
        const selectedPerson = allCollabs[randomIndex];
        const selectedCollab = document.getElementById(selectedPerson.name);
        
        NODE_ELEMENTS.ul_cards.removeChild(selectedCollab)
        selectedCollab.classList.remove('animated')
        selectedCollab.classList.add('startInverse')

        NODE_ELEMENTS.ul_cards.appendChild(selectedCollab)
        selectedCollab.style.left = selectedCollab.offsetLeft - (selectedCollab.offsetWidth + 10) + "px"
        selectedCollab.classList.add('revertAnimated')
        setTimeout(()=>{
            selectedCollab.style.color = selectedPerson.color
        }, 1000)
    }
    
}