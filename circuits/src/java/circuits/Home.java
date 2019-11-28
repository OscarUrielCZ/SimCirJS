package circuits;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.JDOMException;
import org.jdom2.input.SAXBuilder;

public class Home extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String path = request.getRealPath("/");
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        PrintWriter out = response.getWriter();

        response.addHeader("Access-Control-Allow-Origin", "*");
        response.setContentType("application/json;charset=UTF-8");
        
        try {
            SAXBuilder builder = new SAXBuilder();
            File usersXML = new File(path+"\\assets\\xml\\users.xml");
            Document userdocument = builder.build(usersXML);
            Element root = userdocument.getRootElement();
            List userlist = root.getChildren("user");
            
            for(int i=0; i<userlist.size(); i++) {
                Element element = (Element)userlist.get(i);
                String usernamexml = element.getAttributeValue("username");
                String passwordxml = element.getAttributeValue("password");
                
                if(username.compareTo(usernamexml)==0 && password.compareTo(passwordxml)==0) {
                    HttpSession session = request.getSession();
                    
                    session.setAttribute("username", username);
                    out.println("{ \"ok\": \"true\" , \"response\": \"" + username + "\" }");
                    return;
                }
            }
        } catch(JDOMException e) {
            e.printStackTrace();
        }
        out.println("{ \"ok\": \"false\" }");
    }
}
