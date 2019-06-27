<%@ Application Language="C#" %>
<%@ Import Namespace="System.Security.Principal" %>
<script runat="server">


    void Application_BeginRequest(object sender, EventArgs e)
    {
        HttpApplication app = sender as HttpApplication;
       
    }
    void Application_Start(object sender, EventArgs e) 
    {
        // Code that runs on application startup

    }
    
    void Application_End(object sender, EventArgs e) 
    {
        //  Code that runs on application shutdown

    }

    void Application_AuthenticateRequest(object sender, EventArgs e)
    {
        if (Request.IsAuthenticated)
        {
            //get the roles
            Regex regRoles = new Regex("<roles>(.*)</roles>");
            string szUserData = ((FormsIdentity)Context.User.Identity).Ticket.UserData;
            string szIP = Regex.Match(szUserData, "<IP>(.*)</IP>").Groups[1].Value;
            if (szIP != Request.UserHostAddress)
            {
                GenericIdentity identityAnonymous = new GenericIdentity("", "");
                string[] arrSzAnonymousRoles = { };
                Context.User = new GenericPrincipal(identityAnonymous, arrSzAnonymousRoles);
            }
            else
            {
                GroupCollection group = regRoles.Match(szUserData).Groups;
                string szRoles = group[1].Value;
                string[] szArrRoles = szRoles.Split(new string[] { ";" }, StringSplitOptions.RemoveEmptyEntries);
                //create a new principal
                System.Security.Principal.GenericPrincipal newPrincipal = new System.Security.Principal.GenericPrincipal(Context.User.Identity, szArrRoles);
                //add the new principal to the context
                Context.User = newPrincipal;
            }
        }    
    }
    void Application_AuthorizeRequest(object sender, EventArgs e)
    {
      
    }

        
    void Application_Error(object sender, EventArgs e) 
    { 
        // Code that runs when an unhandled error occurs

    }

    void Session_Start(object sender, EventArgs e) 
    {
        // Code that runs when a new session is started

    }

    void Session_End(object sender, EventArgs e) 
    {
        // Code that runs when a session ends. 
        // Note: The Session_End event is raised only when the sessionstate mode
        // is set to InProc in the Web.config file. If session mode is set to StateServer 
        // or SQLServer, the event is not raised.

    }
       
</script>
