package circuits;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.JDOMException;
import org.jdom2.input.SAXBuilder;

public class DashboardServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String path = request.getRealPath("/");
        PrintWriter out = response.getWriter();
        String username = request.getParameter("username");
        String allprojects = "{ \"projects\" : [";
        Boolean mto = false; // more than one project
        
        response.addHeader("Access-Control-Allow-Origin", "*");
        response.setContentType("application/json;charset=UTF-8");
        try {
            SAXBuilder builder = new SAXBuilder();
            File usersXML = new File(path+"\\assets\\xml\\circuits.xml");
            Document userdocument = builder.build(usersXML);
            Element root = userdocument.getRootElement();
            List circuitlist = root.getChildren("circuit");
            
            System.out.println("->" + circuitlist.toString());
            for(int i=0; i<circuitlist.size(); i++) {
                Element element = (Element)circuitlist.get(i);
                String usernamexml = element.getAttributeValue("username");
                String idxml = element.getAttributeValue("id");
                String namexml = element.getAttributeValue("name");
                
                System.out.println("id: " + idxml + " username: " + usernamexml + " name: " + namexml);
                if(username.compareTo(usernamexml)==0) {
                    if(mto)
                        allprojects += ", ";
                    allprojects += "{ \"id\": \"" + idxml + "\" , \"name\": \"" + namexml + "\" }";
                    mto = true;
                }
            }
        } catch(JDOMException e) {
            e.printStackTrace();
        }
        allprojects += "] }";
        out.println(allprojects);
    }
/*
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp)
          throws ServletException, IOException {
        setAccessControlHeaders(resp);
        resp.setStatus(HttpServletResponse.SC_OK);
    }
    
    private void setAccessControlHeaders(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:8081");
        response.setHeader("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
        response.setHeader("Access-Control-Allow-Methods", "GET");
        response.setHeader("Allow", "GET");
    }*/
}
