# Catwalk

## An eccomerce website that is fully interactive

|![alt text](/client/images/homepage.PNG?raw=true "home page")|
|:--:|
| <b>Home page of the website.</b>|

## Tech Stack

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
![Babel](https://img.shields.io/badge/Babel-F9DC3e?style=for-the-badge&logo=babel&logoColor=black)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)

### Testing
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Testing-Library](https://img.shields.io/badge/-TestingLibrary-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white)

### Version Control and Deployment
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)


## Getting Started
*****************
Installation:
```
npm install
npm run build
npm run server-dev
```
Create a new file called `config.js` within the **Catwalk** directory.

Copy the contents within `config.example.js`

Paste the contents into the newly created `config.js` file

Change the `fill here` with your Github Token

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Tests
*******
```
npm run test
```


## Team
******
[Jinho Kum](https://www.linkedin.com/in/jinho-kum/)

[Viola Feng](https://www.linkedin.com/in/mengya-viola-feng-b6a06457/)

[Elton Ha](https://www.linkedin.com/in/elton-ha-b88b38128/)

[Kerry Man](https://www.linkedin.com/in/kairui-man-870203/)


### Overview
**********
Able to navigate through all images and styles using arrows or clicking on the iamge itself. Can expand the picture by clicking on the product image. Can also chose size and quantity to add to cart. The homepage itself has a light and dark mode.


### Related Products and Comparison
*********************************
|![alt text](/client/images/related_products.PNG?raw=true "related products")|
Related products and comparison module consists of two lists. Items in the first list are related to the product shown in the overview section above. Carousel of cards allows users to navigate between the cards. Upon clicking on the star incon, a modal would pop up which compares features between the related item and the product item.  Once a card is clicked, users will navigate to the detail page for that product in the card.

Items in the second list are selected to group together as an outfit by user. It gives the user the ability to add the current product item and navigate through this list.



### Questions and Answers
***********************
|![alt text](/client/images/question_answers.PNG?raw=true "home page")|

Module that responds to the current product shown in the Overview.  Contains a list of sorted questions by helpfulness as well as answers for their respective question.  Users can like the question/answer if it is helpful or report if necessary.  Users can also post a question/answer if they do not find a suitable response to what they are looking for.  The data is retrieved through an API call to a server.


### Ratings and Reviews
*********************
Ratings and Reviews widget has two major components, rating component is visualization of rating data from server, review component will dynamically render a list of reviews. Rating component has a filter function to filter select stars of reviews. Review component has show more reviews, sort reviews and add review that can be interracted with user.



