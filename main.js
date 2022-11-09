
const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const parseArrayInput = (inputStr) => {
    const tokens = inputStr.trim().split(/\s+/);
    const array = tokens.map(elem => parseFloat(elem));
    if (array.length !== tokens.length || array.some(elem => isNaN(elem)))
        return null;
    return array;
}
const insertArrayToHtml = (array) => {
    const html = '<div class="array-element">' +
        array.join('</div><div class="array-element">') +
        '</div>';
    document.getElementById('array').innerHTML = html;
}
const highlightElements = (i, j, additionalClass) => {
    const array = document.getElementById('array').children;
    array[i].classList.add(additionalClass);
    array[j].classList.add(additionalClass);
}
const setStatus = (status) => {
    const statusElem = document.getElementById('status');
    statusElem.innerHTML = status === 'comparing' ? 'Comparing...' : 'Swapping...';
    statusElem.className = status;
}
const bubbleSort = async () => {
    const array = parseArrayInput(document.getElementById('array-input').value);
    if (!array) {
        document.getElementById('input-error').innerHTML = 'Incorrect input!';
        return;
    }
    document.getElementById('input-error').innerHTML = '';
    const n = array.length;
    for (let i = n - 1; i > 0; i--)
        for (let j = 0; j < i; j++) {
            insertArrayToHtml(array);
            highlightElements(j, j + 1, 'compared');
            setStatus('comparing');
            await sleep(1000);
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                insertArrayToHtml(array);
                highlightElements(j, j + 1, 'swapped');
                setStatus('swapping');
                await sleep(1000);
            }

        }
    insertArrayToHtml(array);
    document.getElementById('status').innerHTML = '';
}
var el = document.getElementById('submit-array');
if(el)
{
    el.addEventListener('click', bubbleSort);
}
