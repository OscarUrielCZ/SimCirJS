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
            
            raiz.removeContent();
            for(k=0; k<circuitos.size(); k++){
                String idxml = circuitos.get(k).getAttributeValue("id");
                
                if(!id.equals(idxml)){
                    raiz.addContent(circuitos.get(k));
                    
                    //List<Element> datos = circuitos.get(k).getChildren();
                    //Se borran los datos de <devices> del xml
                    //datos.get(4).removeContent();
                    //Se borran los datos de <connectors>
                    //datos.get(5).removeContent();
                    //LLenar XML
                    //Circuito c = obtenerCircuito(id_circuito, listaCircuitos);
                
                }
            }
            XMLOutputter outputter = new XMLOutputter( Format.getPrettyFormat() );
            //Se reescribe el archivo circuits.xml
            outputter.output(circuitdocument, new FileOutputStream(xmlpath));
        } catch(JDOMException e) {
            e.printStackTrace();
        }
        out.println("{ \"ok\" : true }");
    }
}
