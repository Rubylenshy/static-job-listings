
const container = document.querySelector('.container')
const clearFilter = document.querySelector('.filter a')


clearFilter.addEventListener('click', ()=>{
    document.querySelector('header').classList.add('nofilter')    
});


jobListings('../data.json');

async function jobListings(file){
    let obj = await fetch(file);
    let jsonjobList = await obj.text();    

    const jobList = JSON.parse(jsonjobList);
    let newjobList = '';
    
    jobList.forEach(item =>{ 
        let languageBtn = '';
        let lang_s = '';
        item.languages.forEach(lang =>{
            languageBtn += `<button type="button">${lang}</button>`
            lang_s += `${lang} `
        });

        let toolsBtn = '';
        let tool_s = '';
        item.tools.forEach(tool =>{
            toolsBtn += `<button type="button">${tool}</button>`
            tool_s += `${tool} `
        });

        let htmljobList = `<div class="job-list ${item.featured}" data-role="${item.role}" data-level="${item.level}" 
                            data-languages="${lang_s}" data-tools="${tool_s}">
                                <img src="${item.logo}" alt="" width="50" height="50" >
                                <div class="name-tag">
                                    <h1>${item.company}</h1>
                                    <span class="new ${item.new}">NEW!</span>
                                    <span class="featured ${item.featured}">FEATURED</span>
                                    </div>
                                    <h2>${item.position}</h2>
                                    <div class="duration_location">
                                    <span>${item.postedAt}</span><span>${item.contract}</span><span>${item.location}</span>
                                    </div>
                                <hr>
                                <div class="div-btns">
                                <button type="button">${item.role}</button>
                                <button type="button">${item.level}</button>
                                ${languageBtn}
                                ${toolsBtn}
                                </div>
                            </div>`;

        let jobItem = html.querySelector('.job-list');

                                if (item.featured == true) {
                                    document.querySelector('.container').classList.add('bordered');
                                }
                                
        newjobList += htmljobList;
                                // document.querySelector('.div-btns').addEventListener('click', ()=>{
                                //     document.querySelector('header').classList.remove('nofilter')
                                // })
        
    })
    

    container.innerHTML = newjobList;
}

