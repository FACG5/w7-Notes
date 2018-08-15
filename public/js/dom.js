const header = document.querySelector('#header');


fetchdata('GET', '/getname', null, (err, res) => {
    header.textContent = `Hello ${res}`
})