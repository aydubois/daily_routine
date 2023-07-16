export const GROUPES = []
export const STORAGE = "groupes_daily_t2adh2"
export const TIMES = 15
export let isFirst = {animation : true}
export let interval = null
export const NODE_ELEMENTS = {
    form_collab : document.getElementById("formulaire-collab"),
    form_groupe : document.getElementById("formulaire-groupe"),
    
    input_name : document.getElementById("input-name"),
    input_groupe : document.getElementById("input-groupe"),
    input_avatar : document.getElementById("input-avatar"),
    input_name_groupe : document.getElementById("input-name-groupe"),
    input_color : document.getElementById("input-color"),
    
    visualizeAvatar : document.getElementById("visualizeAvatar"),
    container_tag : document.getElementById("container-tag"),

    get_all_cards : () => document.querySelectorAll('#main-list li'),
    ul_cards : document.getElementById("main-list"),
    ul_collabs : document.getElementById("list-collab"),
    
    button_start : document.getElementById("button-select"),
    button_save : document.getElementById("saveList"),
    button_submit_groupe : document.getElementById("submit-groupe"),
    button_submit_collab : document.getElementById("submit-collab"),
}

export let ERROR_SIZE = {message: ''}