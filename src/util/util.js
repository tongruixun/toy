export function changeThemeColor(themes) {
    document.getElementById('theme').innerHTML = `:root{--bgColor:${themes};}`
}

