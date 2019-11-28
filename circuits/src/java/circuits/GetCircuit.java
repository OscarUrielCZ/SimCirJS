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

public class GetCircuit extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String path = request.getRealPath("/");
        PrintWriter out = response.getWriter();
        String id = request.getParameter("id");
        String project = "{";
        Boolean mto = false; // more than one
        int i, j;
        
        response.addHeader("Access-Control-Allow-Origin", "*");
        response.setContentType("application/json;charset=UTF-8");
        try {
            SAXBuilder builder = new SAXBuilder();
            File circuitsXML = new File(path+"\\assets\\xml\\circuits.xml");
            Document circuitdocument = builder.build(circuitsXML);
            Element root = circuitdocument.getRootElement();
            List circuitlist = root.getChildren("circuit");
            
            for(i=0; i<circuitlist.size(); i++) {
                Element element = (Element)circuitlist.get(i);
                String idxml = element.getAttributeValue("id");
                String namexml = element.getAttributeValue("name");
                
                if(id.compareTo(idxml)==0) {
                    String width = element.getChildText("width");
                    String height = element.getChildText("height");
                    Element devices = element.getChild("devices");
                    Element connectors = element.getChild("connectors");
                    
                    project += "\"name\": \"" + namexml + "\", \"features\": {\"devices\": [";
                    
                    mto = false;
                    List devicelist = devices.getChildren("device");
                    for(j=0; j<devicelist.size(); j++) {
                        Element device = (Element)devicelist.get(j);
                        String type = device.getChildText("type");
                        String did = device.getChildText("id");
                        String x = device.getChildText("x");
                        String y = device.getChildText("y");
                        String label = device.getChildText("label");
                        
                        if(mto)
                            project += ",";
                        project += "{ \"type\": \"" + type + "\", \"id\": \"" + did + "\", \"x\": " +
                                x + ", \"y\": " + y + ", \"label\": \"" + label + "\"}";
                        mto = true;
                    }
                    project += "], \"connectors\": [";
                    mto = false;
                    List connectorlist = connectors.getChildren("connector");
                    for(j=0; j<connectorlist.size(); j++) {
                        Element connector = (Element)connectorlist.get(j);
                        String from = connector.getChildText("from");
                        String to = connector.getChildText("to");
                        
                        if(mto)
                            project += ",";
                        project += "{ \"from\": \"" + from + "\", \"to\": \"" + to + "\"}";
                        mto = true;
                    }
                }
            }
        } catch(JDOMException e) {
            e.printStackTrace();
        }
        project += "]}}";
        System.out.println(project);
        out.println(project);
    }
}
