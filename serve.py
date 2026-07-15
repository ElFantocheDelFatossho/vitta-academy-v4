import functools
import http.server
import os

# SimpleHTTPRequestHandler não manda Cache-Control por padrão, então o
# navegador cacheia os arquivos por heurística (baseado só em Last-Modified) e
# ignora reloads normais — quem edita o site localmente vê a versão antiga
# "grudada" mesmo depois de salvar. Desliga o cache em dev pra cada save
# aparecer na hora.
class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, must-revalidate")
        super().end_headers()

port = int(os.environ.get("PORT", 5173))
directory = os.path.dirname(os.path.abspath(__file__))
handler = functools.partial(NoCacheHandler, directory=directory)
http.server.test(HandlerClass=handler, port=port)
