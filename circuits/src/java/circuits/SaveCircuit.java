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

public class SaveCircuit extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String path = request.getRealPath("/");
        String xmlpath = path+"\\assets\\xml\\circuits.xml";
        PrintWriter out = response.getWriter();
        
        //id para reconocer el cicruito dentro del xml
        String id = request.getParameter("id");
        String circuitname = request.getParameter("name");
        String username = request.getParameter("username");
        int ndevices = Integer.parseInt(request.getParameter("ndevices"));
        int nconnectors = Integer.parseInt(request.getParameter("nconnectors"));
        Device[] devices = new Device[ndevices];
        Connector[] connectors = new Connector[nconnectors];
        int i, j;
        
        response.addHeader("Access-Control-Allow-Origin", "*");
        response.setContentType("application/json;charset=UTF-8");

        for(i=0; i<ndevices; i++)
            devices[i] = new Device(request.getParameter("di"+i), request.getParameter("dt"+i), request.getParameter("dl"+i), request.getParameter("dx"+i), request.getParameter("dy"+i));
        for(i=0; i<nconnectors; i++)
            connectors[i] = new Connector(request.getParameter("cf"+i), request.getParameter("ct"+i));
        
        try {
            SAXBuilder builder = new SAXBuilder();
            File circuitsXML = new File(xmlpath);
            Document circuitdocument = builder.build(circuitsXML);
            Element raiz = circuitdocument.getRootElement();
            
            List<Element> circuitos = raiz.getChildren(); //Se obtiene el arreglo de circuitos del archivo
            
            Element newcirc = new Element("circuit");
            Element newdevs = new Element("devices");
            Element newcons = new Element("connectors");

            newcirc.setAttribute("id", id);
            newcirc.setAttribute("username", username);
            newcirc.setAttribute("name", circuitname);
            newcirc.addContent(newdevs);
            newcirc.addContent(newcons);

            for(j=0; j< ndevices; j++){
                Element newDevice = new Element("device");
                Element idD = new Element("id");
                Element type = new Element("type");
                Element x = new Element("x");
                Element y = new Element("y");
                Element label = new Element("label");

                idD.setText(devices[j].getId());
                type.setText(devices[j].getType());
                x.setText(devices[j].getX());
                y.setText(devices[j].getY());
                label.setText(devices[j].getLabel());
                newDevice.addContent(idD);
                newDevice.addContent(type);
                newDevice.addContent(x);
                newDevice.addContent(y);
                newDevice.addContent(label);

                newdevs.addContent(newDevice);
            }

            for(j=0; j< nconnectors;  j++){
                Element newConnector = new Element("connector");
                Element from = new Element("from");
                Element to = new Element("to");

                from.setText(connectors[j].getFrom());
                to.setText(connectors[j].getTo());
                newConnector.addContent(from);
                newConnector.addContent(to);

                newcons.addContent(newConnector);
            }
            
            raiz.addContent(newcirc);
            
            XMLOutputter outputter = new XMLOutputter( Format.getPrettyFormat() );
            outputter.output(circuitdocument, new FileOutputStream(xmlpath));
            out.println("{ \"ok\" : true }");
        } catch(JDOMException e) {
            e.printStackTrace();
            out.println("{ \"ok\" : false }");
        }
    }
}

