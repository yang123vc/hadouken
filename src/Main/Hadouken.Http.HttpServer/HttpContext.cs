﻿using System.Net;
using Hadouken.Common.Http;

namespace Hadouken.Http.HttpServer
{
    public class HttpContext : IHttpContext
    {
        private readonly HttpListenerContext _context;

        private HttpRequest _request;
        private HttpResponse _response;

        public HttpContext(HttpListenerContext listenerContext)
        {
            _context = listenerContext;
        }

        public IHttpRequest Request
        {
            get { return _request ?? (_request = new HttpRequest(_context.Request)); }
        }

        public IHttpResponse Response
        {
            get { return _response ?? (_response = new HttpResponse(_context.Response)); }
        }

        public System.Security.Principal.IPrincipal User
        {
            get { return _context.User; }
        }
    }
}
