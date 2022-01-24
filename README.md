# GPA Markdown Chart
This is a [Next.js](https://nextjs.org/) project hosted on [Vercel](https://vercel.com).

## Frontend
![screenshot](/public/Screenshot-2022-01-24.png?raw=true)

## API
```
query_parameters:
  required: either sgpa or cgpa or both
  - name: sgpa
    schema:
      type: string
      format: comma-separated floats
  - name: cgpa
    schema:
      type: string
      format: comma-separated floats
  - name: labels
    schema:
      type: string
      format: comma-separated strings
```
Example: 
[Link](https://gpa-md.vercel.app/api?sgpa=3.39%2C4%2C3.82%2C3.69%2C2.96&cgpa=3.39%2C3.48%2C3.64%2C3.79%2C3.52&labels=Fall%2019%2CSpring%2020%2CFall%2020%2CSpring%2021%2CFall%2021)
![Embedded](https://gpa-md.vercel.app/api?sgpa=3.39%2C4%2C3.82%2C3.69%2C2.96&cgpa=3.39%2C3.48%2C3.64%2C3.79%2C3.52&labels=Fall%2019%2CSpring%2020%2CFall%2020%2CSpring%2021%2CFall%2021)

## Running locally
First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.
