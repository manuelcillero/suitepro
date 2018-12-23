# Redmine

Redmine is a flexible project management web application written using Ruby on
Rails framework.

More details can be found in the doc directory or on the official website
http://www.redmine.org

# SuitePro

En **SuitePro** concurren potencia y sencillez para planificar, compartir
conocimiento, prestar soporte a clientes y acelerar la productividad. SuitePro
es **Redmine** con un conjunto de *plugins* y unas mínimas modificaciones para
personalizarlo.

## A propósito del tema

Se trata de una adaptación, admitida por la licencia de **RedmineUp** en su tema
**Circle** (https://www.redmineup.com/pages/es/themes/circle), a los estilos de
mi sitio web personal en https://manuel.cillero.es.

## *Plugins* activos

### Redmine Checklists plugin (Light version)

  * checklists 3.1.10
  * https://www.redmine.org/plugins/redmine_checklists
  * https://www.redmineup.com/pages/plugins/checklists

### Redmine CKEditor plugin

  * ckeditor 1.1.5
  * https://www.redmine.org/plugins/redmine-ckeditor
  * http://github.com/a-ono/redmine_ckeditor

### Redmine Q&A plugin

  * questions 0.0.7
  * https://www.redmine.org/plugins/redmine_questions
  * http://www.redminecrm.com/projects/questions

## Archivos del *core* modificados
```
suitepro/
   |
   +-- app/
   |    |
   |    +-- controllers/wiki_controller.rb
   |    |
   |    +-- helpers/search_helper.rb
   |    |
   |    +-- views/account/login.html.erb
   |         |
   |         +-- /layouts/base.html.erb
   |
   +-- config/locales/en.yml
   |             |
   |             +-- /es.yml
   |
   +-- README.rdoc  (este mismo archivo, para documentación añadida)
```
