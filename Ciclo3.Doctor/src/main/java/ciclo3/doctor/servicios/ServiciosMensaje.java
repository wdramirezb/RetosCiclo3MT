package ciclo3.doctor.servicios;

import ciclo3.doctor.entidades.Mensaje;
import ciclo3.doctor.repositorios.RepositorioMensaje;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
    
/**
 * Comentario que indica que se trata de una clase de servicio.
 * Determina los servicios para gestionar los mensajes.
 */
@Service
public class ServiciosMensaje {

    /**
     * Anotación que permite inyectar unas dependencias con otras dentro de Spring.
     */
    @Autowired
    private RepositorioMensaje metodosCrud;
    
    /**
     * Servicio que maneja la consulta (READ-GET) de todos los registros en la tabla. 
     */
    public List<Mensaje> getAll() {
        return metodosCrud.getAll();
    }

    /**
     * Servicio que maneja la consulta (READ-GET) de un registro en la tabla. 
     */
    public Optional<Mensaje> getMessage(int messageId) {
        return metodosCrud.getMessage(messageId);
    }
    
    /**
     * Servicio que maneja la creación o guardado (CREATE-POST) de nuevos registros en la tabla. 
     */
    public Mensaje save(Mensaje message) {
        if (message.getIdMessage() == null) {
            return metodosCrud.save(message);
        } else {
            Optional<Mensaje> mensaje = metodosCrud.getMessage(message.getIdMessage());
            if (mensaje.isEmpty()) {
                return metodosCrud.save(message);
            } else {
                return message;
            }
        }
    }
    
    /**
     * Servicio que maneja la actualización (UPDATE-PUT) de registros existentes en la tabla. 
     */
    public Mensaje update(Mensaje message) {
        if (message.getIdMessage() != null) {
            Optional<Mensaje> mes = metodosCrud.getMessage(message.getIdMessage());
            if (!mes.isEmpty()) {
                if (message.getMessageText() != null) {
                    mes.get().setMessageText(message.getMessageText());
                }
                return metodosCrud.save(mes.get());
            } else {
                return message;
            }
        } else {
            return message;
        }
    }
    
    /**
     * Servicio que maneja la eliminación (DELETE) de registros existentes en la tabla. 
     */
    public boolean deleteMessage(int messageId) {
        Boolean aBoolean = getMessage(messageId).map(message -> {
            metodosCrud.delete(message);
            return true;
        }).orElse(false);
        return aBoolean;
    }

}
