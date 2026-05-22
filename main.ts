
   const PSK = "mypasswd1235";
   
   Deno.serve({ port: 8000 }, async (req) => {
     const url = new URL(req.url);
     if (url.pathname === "/exit" && req.headers.get("X-PSK") === PSK) {
       const target = req.headers.get("X-Target");
       if (!target) return new Response("Missing target", { status: 400 });
       const response = await fetch(target, {
         method: req.method,
         headers: req.headers,
         body: req.body,
       });
       return new Response(response.body, response);
     }
     return new Response("ok", { status: 200 });
   });
   
