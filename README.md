# Outfit Store MODEL
Ecommerce model 100% functional 


### Desktop Layout
![outfitpclayout2](https://github.com/vituhonorato/outfit-store/assets/101150943/49bc5841-a3fa-4fde-9402-7d016d51597a)


### Smartphone Layout
![outfitsplayout](https://github.com/vituhonorato/outfit-store/assets/101150943/2f4f9cb6-5b37-4e50-92c1-44100fddcfd2)

## Technologies



<div style="display: inline_block"><br/>
  <img align="center" alt="jvmh-typescript" height="50" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" />
  <img align="center" alt="jvmh-nextjs" height="50" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" />
<img align="center" alt="jvmh-reactjs" height="50" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" />
 <img align="center" alt="jvmh-nodejs" height="50" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain.svg" />
<img align="center" alt="jvmh-mongodb" height="50" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-plain.svg" />
  <img align="center" alt="jvmh-cloudnary" height="50" width="50" src="https://res.cloudinary.com/diypdepuw/image/upload/v1699044264/cloudinary_ckujxh.png" />
<img align="center" alt="jvmh-tailwindcss" height="50" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" />
<img align="center" alt="jvmh-jest" height="50" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" />




</div>



## Services Used

* Github
* Vercel
* Mongo DB Atlas
* PayPal
* Cloudinary

## Getting started

* Dependency
  - Formik
  - JS-cookie
  - Typescript
  - Toastfy
  - React-icons
  - YUP
  - Mongoose
  - Next-auth
  - Axios
  
* To install the dependencies.
```bash
  $ npm install
  ```
  
* To run the project.
```bash
  $ npm run start
  ```

* To seed on data base
```
import Product from "@/models/Product";
import User from "@/models/User";
import data from "@/utils/data";
import db from "../../utils/db"

const handler = async (req:any, res:any) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await Product.deleteMany();
  await Product.insertMany(data.products);
  await db.disconnect();
  res.send({message: 'seeded successfully'})

};
export default handler;
```







## Features

The main features of the application are:
 - Auth register and login
 - Integration system with Mongo DB
 - Use Paypal API to mange payment of these application

## Links
  - Deploy on Vercel: Soon 
  - Repository: https://github.com/vituhonorato/outfit-store
  - In case of sensitive bugs like security vulnerabilities, please contact
    vituhonorato.89@gmail.com directly instead of using issue tracker. We value your effort
    to improve the security and privacy of this project!

  ## Versioning

  1.0.0.0


  ## Authors

  * **JVMH** 

  Please follow github and join us!
  Thanks to visiting me and good coding!
