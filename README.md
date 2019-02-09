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

Se trata de una adaptación, permitida por la licencia de **RedmineUp**, del tema
**Circle** (https://www.redmineup.com/pages/es/themes/circle), para ajustarse al diseño de mi sitio web personal en https://manuel.cillero.es.

## *Plugins* activos

### Redmine Checklists plugin (Light version)

  * checklists 3.1.10
  * https://www.redmine.org/plugins/redmine_checklists
  * https://www.redmineup.com/pages/plugins/checklists

### Redmine CKEditor plugin

  * ckeditor 1.1.5
  * https://www.redmine.org/plugins/redmine-ckeditor
  * http://github.com/a-ono/redmine_ckeditor
  * Actualizado con la librería highlight.js 9.13.1 (https://highlightjs.org) sólo para los lenguajes requeridos (ver `config/ckeditor.yml`)
  * Y actualizado con la vesión 4.11.2 de CKEditor (https://ckeditor.com/ckeditor-4/) incluyendo los componentes añadidos y una versión ampliada de `ckeditor-contrib\plugins\redmine` para gestionar mejor macros, enlaces a páginas y otros marcadores. Otros archivos modificados son:
```
redmine_ckeditor
   |
   +-- /assets/ckeditor/styles.js  (commit #856ca32d)
          |
          +-- /ckeditor-contrib/plugins/redmine/*
          |
          +-- /ckeditor-contrib/plugins/youtube/lang/es.js  (commit #02f57502)
                                           |
                                           +-- /plugins.js  (commit     "    )
```

### Redmine Glossary Plugin

  * glossary 0.9.2
  * https://www.r-labs.org/projects/rp-glossary/wiki/UsageEn
  * https://github.com/torutk/redmine_glossary
  * Adaptado con modificaciones en los siguientes archivos:
```
redmine_glossary
   |
   +-- /app/controllers/glossary_controller.rb
   |   |
   |   +-- /helpers/glossary_helper.rb
   |   |       |
   |   |       +-- /glossary_styles_helper.rb
   |   |
   |   +-- /views/glossary/_index_in_category.html.erb
   |         |        |
   |         |        +-- /_show_all_in_category.html.erb
   |         |        |
   |         |        +-- /_show_one.html.erb
   |         |        |
   |         |        +-- /_sidebar.html.erb
   |         |        |
   |         |        +-- /index.html.erb
   |         |
   |         +-- /glossary_styles/_form.html.erb
   |                         |
   |                         +-- /_search.html.erb
   |
   +-- /config/locales/es.yml
```

### Redmine Private Wiki Plugin

  * private_wiki 0.2.0
  * http://www.redmine.org/plugins/redmine_private_wiki
  * https://github.com/BlueXML/redmine_private_wiki
  * Con los siguientes archivos modificados para corregir un problema de visualización (ver https://github.com/BlueXML/redmine_private_wiki/issues/2):
```
redmine_private_wiki
   |
   +-- /app/views/private_wiki_management_views/_body_bottom.html.erb
   |         |
   |         +-- /wiki/date_index.html.erb
   |
   +-- /assets/stylesheets/private_wiki.css
   |
   +-- /config/locales/en.yml
   |              |
   |              +-- /es.yml
   |              |
   |              +-- /fr.yml
   |
   +-- /lib/wiki_patches/application_helper_patch.rb
```

### Redmine Q&A plugin

  * questions 0.0.7
  * https://www.redmine.org/plugins/redmine_questions
  * http://www.redminecrm.com/projects/questions

### Redmine Wiki Lists Plugin

  * wiki_lists 0.0.9
  * http://www.r-labs.org/projects/wiki_lists/wiki/Wiki_Lists_en
  * https://github.com/tkusukawa/redmine_wiki_lists
  * Con los siguientes archivos añadidos para simplificar la cabecera de las listas de peticiones y mostrar un enlace al diagrama de Gantt si es una consulta personalizada:
```
redmine_wiki_lists
   |
   +-- /app/views/issues/_embedded_list.html.erb
   |
   +-- /config/locales/en.yml
                  |
                  +-- /es.yml
```

## Otros archivos del *core* modificados
```
suitepro
   |
   +-- /app/controllers/wiki_controller.rb
   |   |
   |   +-- /helpers/search_helper.rb
   |   |
   |   +-- /views/account/login.html.erb
   |         |
   |         +-- /layouts/base.html.erb
   |
   +-- /config/locales/en.yml
   |              |
   |              +-- /es.yml
   |
   +-- /README.md  (este mismo archivo, para documentación añadida)
```
