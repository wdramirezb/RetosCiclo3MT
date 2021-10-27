package ciclo3.doctor.servicios;

import ciclo3.doctor.entidades.Cliente;
import ciclo3.doctor.repositorios.RepositorioCliente;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiciosCliente {

    @Autowired
    private RepositorioCliente metodosCrud;

    public List<Cliente> getAll() {
        return metodosCrud.getAll();
    }

    public Optional<Cliente> getClient(int clientId) {
        return metodosCrud.getCliente(clientId);
    }

    public Cliente save(Cliente client) {
        if (client.getIdClient() == null) {
            return metodosCrud.save(client);
        } else {
            Optional<Cliente> cliente = metodosCrud.getCliente(client.getIdClient());
            if (cliente.isEmpty()) {
                return metodosCrud.save(client);
            } else {
                return client;
            }
        }
    }

    public Cliente update(Cliente client) {
        if (client.getIdClient() != null) {
            Optional<Cliente> cli = metodosCrud.getCliente(client.getIdClient());
            if (!cli.isEmpty()) {
                if (client.getName() != null) {
                    cli.get().setName(client.getName());
                }
                if (client.getAge() != null) {
                    cli.get().setAge(client.getAge());
                }
                if (client.getPassword() != null) {
                    cli.get().setPassword(client.getPassword());
                }
                return metodosCrud.save(cli.get());
            } else {
                return client;
            }
        } else {
            return client;
        }
    }

    public boolean deleteClient(int clientId) {
        Boolean aBoolean = getClient(clientId).map(client -> {
            metodosCrud.delete(client);
            return true;
        }).orElse(false);
        return aBoolean;
    }

}
