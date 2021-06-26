

## after

want to see more? 

To make this practical we should be able to do client side routing.

One approach I've thought of, is auto generating a main entry point that references all possible routes for the end user.

It would loop over all the files in the pages folder, and generate 1 client entry point using React.lazy and react-router routes.

By doing this, we would have to make our server side prop logic more advanced as well. When clicking between pages we would need to load the next page's props from the server before rendering the component on the client.

As you can see, building a framework similar to nextjs is A LOT of work :) 