/*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });*/

const titleClickHandler = function(event){
  event.preventDefault();

  const clickedElement = this;
 
  /* [DONE] remove class 'active' from all article links  */
  const activeLink = document.querySelector('.titles a.active');
  if(activeLink) activeLink.classList.remove('active');

  /* [DONE] add class 'active' to the clicked link */

  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */

  const activeArticle = document.querySelector('.posts .active');
  if(activeArticle) activeArticle.classList.remove('active');
  
  /* [DONE] get 'href' attribute from the clicked link */
    
  const articleSlector = clickedElement.getAttribute('href');
  console.log(articleSlector)
    
  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSlector);

  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add('active');
};
  
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-',
  optAuthorListSelector = '.authors.list';


function generateTitleLinks(customSelector = ''){

  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  
  /* [DONE] for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';

  for(let article of articles){
    
    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* [DONE] create HTML of the link */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    
    /* [DONE] insert link into titleList */

    html = html + linkHTML;
  }
  
  titleList.innerHTML = html;
  
  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function calculateTagsParams(tags = ''){
  const params = {
    max : 0,
    min : 999999,
  };
  for(let tag in tags){
    if(tags[tag] > params.max){
      params.max = tags[tag];
      };

    if(tags[tag] < params.min){
        params.min = tags[tag];
      };

    console.log(tag + ' is used ' + tags[tag] + ' times');
  }
  return params;
}

function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return optCloudClassPrefix + classNumber;
}

function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for(let article of articles){
    /* find tags wrapper */
    const articleTag = article.querySelector(optArticleTagsSelector);
    articleTag.innerHTML = '';
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags= article.getAttribute('data-tags');
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + ' ' + '</a></li>';
      /* add generated code to html variable */
      html = html + linkHTML
      
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]) {
  /* [NEW] add tag to allTags object */
       allTags[tag] = 1;
      } else {
      allTags[tag]++;
      }
      console.log(allTags);
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    articleTag.innerHTML = html;
  /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  /* [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams)
  let allTagsHTML = '';

/* [NEW] START LOOP: for each tag in allTags: */
for(let tag in allTags){
  /* [NEW] generate code of a link and add it to allTagsHTML */
  allTagsHTML += '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '"> ' + tag + '</a></li>';
}
/* [NEW] END LOOP: for each tag in allTags: */

/*[NEW] add HTML from allTagsHTML to tagList */
tagList.innerHTML = allTagsHTML;
}

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log (tag)
  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for (let activeTagLink of activeTagLinks){
    /* remove class active */
    if(activeTagLink) activeTagLink.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks){
    /* add class active */
    tagLink.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const linksToTags = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for (let linkToTag of linksToTags){
    /* add tagClickHandler as event listener for that link */
    linkToTag.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();


function generateAuthors(){
  /* [NEW] create a new variable allTags with an empty object */
  let allAuthors = {};

  const articles = document.querySelectorAll(optArticleSelector);
  const postAuthor = document.querySelector(optArticleAuthorSelector);

  for(let article of articles){

    
    
    postAuthor.innerHTML = '';

    let html = '';

    const articleAuthor= article.getAttribute('data-author');

    const linkHTML = '<a href="#author-' + articleAuthor + '">' + articleAuthor + ' ' + '</a>';

    if (!allAuthors[articleAuthor]) {
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
    console.log(allAuthors);

    html = linkHTML;
    
    postAuthor.innerHTML = html;
  }
  const authorsList = document.querySelector(optAuthorListSelector);
  let authorsListHTML = '';
  for (let author in allAuthors) {
      /* [NEW] generate code of a link and add it to allTagsHTML */
    authorsListHTML += '<li><a href="#author-' + author + '">' + author + ' (' + allAuthors[author] + ')</a></li>';

  }
  authorsList.innerHTML = authorsListHTML;
}

generateAuthors();

function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');
  console.log (author)
  /* find all tag links with class active */
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  /* START LOOP: for each active tag link */
  for (let activeAuthorLink of activeAuthorLinks){
    /* remove class active */
     activeAuthorLink.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let authorLink of authorLinks){
    /* add class active */
    authorLink.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthor(){
  /* find all links to tags */
  const linksToAuthor = document.querySelectorAll('a[href^="#author-"]')
  /* START LOOP: for each link */
  for (let linkToAuthor of linksToAuthor){
    /* add tagClickHandler as event listener for that link */
    linkToAuthor.addEventListener('click', authorClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToAuthor();



//allTagsHTML += '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '"> ' + tag + '(' + (allTags[tag]) + ')' + '</a></li>';
