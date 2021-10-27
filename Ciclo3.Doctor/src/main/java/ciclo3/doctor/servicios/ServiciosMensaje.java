package ciclo3.doctor.servicios;

import ciclo3.doctor.entidades.Mensaje;
import ciclo3.doctor.repositorios.RepositorioMensaje;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiciosMensaje {

    @Autowired
    private RepositorioMensaje metodosCrud;

    public List<Mensaje> getAll() {
        return metodosCrud.getAll();
    }

    public Optional<Mensaje> getMessage(int messageId) {
        return metodosCrud.getMessage(messageId);
    }

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

    public boolean deleteMessage(int messageId) {
        Boolean aBoolean = getMessage(messageId).map(message -> {
            metodosCrud.delete(message);
            return true;
        }).orElse(false);
        return aBoolean;
    }

}
