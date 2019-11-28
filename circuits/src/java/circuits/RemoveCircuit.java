package circuits;

import java.io.File;
import java.io.FileOutputStream;
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
import org.jdom2.output.Format;
import org.jdom2.output.XMLOutputter;

public class RemoveCircuit extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String path = request.getRealPath("/");
        String xmlpath = path+"\\assets\\xml\\circuits.xml";
        PrintWriter out = response.getWriter();
        
        String id = request.getParameter("id");
        int k;
        
        response.addHeader("Access-Control-Allow-Origin", "*");
        response.setContentType("application/json;charset=UTF-8");
        
        try {
            SAXBuilder builder = new SAXBuilder();
            File circuitsXML = new File(xmlpath);
            Document circuitdocument = builder.build(circuitsXML);
            Element raiz = circuitdocument.getRootElement();
            
            List<Element> circuitos = raiz.getChildren();
            
            for(k=0; k<circuitos.size(); k++){
                String idxml = circuitos.get(k).getAttributeValue("id");
                String namexml = circuitos.get(k).getAttributeValue("name");
                
                if(id.equals(idxml)){
                    raiz.removeContent(circuitos.get(k));
                    out.println("{ \"ok\" : true, \"name\": \"" + namexml + "\" }");
                    break;
                }
            }
            XMLOutputter outputter = new XMLOutputter( Format.getPrettyFormat() );
            outputter.output(circuitdocument, new FileOutputStream(xmlpath));
        } catch(JDOMException e) {
            e.printStackTrace();
            out.println("{ \"ok\" : false }");
        }
    }
}
