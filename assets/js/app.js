
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
        let language_s = '';
        item.languages.forEach(lang =>{
            language_s += `<button type="button">${lang}</button>`
        });

        let tool_s = '';
        item.tools.forEach(tool =>{
            tool_s += `<button type="button">${tool}</button>`
        });

        let htmljobList = `<div class="job-list ${item.featured}" data-role="${item.role}" data-level="${item.level}" 
                            data-languages="${item.languages}" data-tools="${item.tools}">
                                <img src="${item.logo}" alt="">
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
                                ${language_s}
                                ${tool_s}
                                </div>
                            </div>`;
                                
                                if (item.featured == true) {
                                    document.querySelector('.container').classList.add('bordered');
                                }
        newjobList += htmljobList;

        
    })
                            
    container.innerHTML = newjobList;
}