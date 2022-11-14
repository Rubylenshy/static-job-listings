
const container = document.querySelector('.container')
const filterDiv = document.querySelector('.filter-btn')
const clearFilter = document.querySelector('.filter a')

function nofilter(){
    filterDiv.innerHTML = ''
    document.querySelector('header').classList.add('nofilter')
}


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
                                <div class="list-group">
                                <img src="${item.logo}" alt="" width="50" height="50" >
                                <div>
                                <div class="name-tag">
                                    <h1>${item.company}</h1>
                                    <span class="new ${item.new}">NEW!</span>
                                    <span class="featured ${item.featured}">FEATURED</span>
                                </div>
                                    <h2>${item.position}</h2>
                                <div class="duration_location">
                                    <span>${item.postedAt}</span><span>${item.contract}</span><span>${item.location}</span>
                                </div>
                                </div>
                                </div>
                                <hr>
                                <div class="div-btns">
                                <button type="button">${item.role}</button>
                                <button type="button">${item.level}</button>
                                ${languageBtn}
                                ${toolsBtn}
                                </div>
                            </div>`;
                            
                            if (item.featured == true) {
                                    document.querySelector('.container').classList.add('bordered');
                                }
                                
                                newjobList += htmljobList;
                               
                                    
    })
                                
    window.addEventListener('load', ()=>{

        function allJobs(){
            jobItem.forEach(job=>{
                job.style.display = 'block'
            })
        }
        clearFilter.addEventListener('click', ()=>{
               nofilter();
               allJobs();
        });

        let jobItem = document.querySelectorAll('.job-list');
            document.querySelector('.div-btns').addEventListener('click', ()=>{
                document.querySelector('header').classList.remove('nofilter')
            })

            let btn = container.querySelectorAll('button');
            
            btn.forEach(item=>{
                item.addEventListener('click', ()=>{
                    document.querySelector('header').classList.remove('nofilter')
                    function filter(){
                        const btnfilter = document.createElement('button');
                        const cross = document.createElement('img');
                        btnfilter.type = 'button';
                        btnfilter.textContent = item.textContent;
                        cross.src = 'assets/images/icon-remove.svg';
                        cross.alt = 'Cancel button';
                        cross.addEventListener('click', (remove)=>{
                            const button = remove.target.parentElement
                            button.parentNode.removeChild(button)
                            btnAll = document.querySelectorAll('header button')
                            if(btnAll.length == 0){
                                nofilter();
                                allJobs();
                            }
                        })
                        btnfilter.append(cross)
                        filterDiv.append(btnfilter)
                    }
                    filter()
                    jobItem.forEach(job=>{
                        if(job.dataset.role == 'Frontend'){
                            job.style.display = 'none'
                        }
                        // else if(job.dataset.role == 'Backend'){
                        //     job.style.display = 'none'
                        // }
                    })
                })
            })

    })

    container.innerHTML = newjobList;
}

