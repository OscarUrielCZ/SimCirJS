package circuits;

import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.JDOMException;
import org.jdom.input.SAXBuilder;
import org.jdom.output.Format;
import javax.xml.parsers.*;
import org.jdom.output.XMLOutputter;

public class SaveCircuit extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String path = request.getRealPath("/");
        String xmlpath = path+"\\assets\\xml\\circuits.xml";
        PrintWriter out = response.getWriter();
        
        String width = request.getParameter("width");
        String height = request.getParameter("height");
        String showToolbox = request.getParameter("showToolbox");
        int ntoolbox = Integer.parseInt(request.getParameter("ntoolbox"));
        int ndevices = Integer.parseInt(request.getParameter("ndevices"));
        int nconnectors = Integer.parseInt(request.getParameter("nconnectors"));
        String[] toolbox = new String[ntoolbox];
        Device[] devices = new Device[ndevices];
        Connector[] connectors = new Connector[nconnectors];
        int i;
        
        response.addHeader("Access-Control-Allow-Origin", "*");
        response.setContentType("application/json;charset=UTF-8");
        
        for(i=0; i<ntoolbox; i++)
            toolbox[i] = request.getParameter("tb"+i);
        for(i=0; i<ndevices; i++)
            devices[i] = new Device(request.getParameter("di"+i), request.getParameter("dt"+i), request.getParameter("dl"+i), request.getParameter("dx"+i), request.getParameter("dy"+i));
        for(i=0; i<nconnectors; i++)
            connectors[i] = new Connector(request.getParameter("cf"+i), request.getParameter("ct"+i));
        
        try {
            SAXBuilder builder = new SAXBuilder();
            File circuitsXML = new File(xmlpath);
            
            Document circuitdocument = builder.build(circuitsXML);
            // Document documenttemp = new Document();
            // Element root = circuitdocument.getRootElement();
            // List circuits = root.getChildren();
            Element circuit = new Element("circuit");
            Element widthEl = new Element("width");
            Element heightEl = new Element("height");
            Element stbEl = new Element("showToolbox");
            Element tbEl = new Element("toolbox");
            Element devsEl = new Element("devices");
            Element consEl = new Element("connectors");
            
            widthEl.setText(width);
            heightEl.setText(height);
            stbEl.setText(showToolbox);
            
            circuit.setAttribute("id", "1234");
            circuit.setAttribute("username", "osquitar");
            circuit.setAttribute("nombre", "olvcompa");
            
            circuit.addContent(widthEl);
            circuit.addContent(heightEl);
            circuit.addContent(stbEl);
            circuit.addContent(tbEl);
            circuit.addContent(devsEl);
            circuit.addContent(consEl);
            
            circuitdocument.getRootElement().addContent(circuit);
            //circuitdocument.setRootElement(root);
            
            Element circuitselement = new Element("circuits");
            Document document = new Document(circuitselement);
            document.getRootElement().detach();
            circuitselement.addContent(circuit);
            document.setRootElement(circuitselement);
            //document.getRootElement().addContent(circuit);
            XMLOutputter xmloutput = new XMLOutputter(Format.getPrettyFormat());
            xmloutput.output(document, new FileWriter(xmlpath));
            System.out.println("Salvado!");
        } catch(JDOMException e) {
            e.printStackTrace();
        }
        out.println("{ \"ok\" : true }");
    }
}

class Device {
    public String id;
    public String type;
    public String label;
    public String x, y;
    
    public Device(String id, String type, String label, String x, String y) {
        this.id = id;
        this.type = type;
        this.label = label;
        this.x = x;
        this.y = y;
    }
}

class Connector {
    public String from, to;
    
    public Connector(String from, String to) {
        this.from = from;
        this.to = to;
    }
}