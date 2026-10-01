<template>
  <div class="legal-page">
    <section class="hero">
      <div class="container hero-content">
        <h1>{{ t.title }}</h1>
        <p>{{ t.updated }}</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="legal-body">

          <p class="lead">{{ t.lead }} <a href="https://boat-solutions.es">https://boat-solutions.es</a>.</p>
          <p>{{ t.intro }}</p>

          <h2>{{ t.s1Title }}</h2>
          <p>{{ t.s1p1 }}</p>
          <p>{{ t.s1p2 }}</p>
          <p>{{ t.s1p3 }}</p>

          <h2>{{ t.s2Title }}</h2>
          <p>{{ t.s2p1 }}</p>
          <p>{{ t.s2p2 }}</p>
          <ul>
            <li v-for="item in t.s2list" :key="item">{{ item }}</li>
          </ul>

          <h2>{{ t.s3Title }}</h2>
          <p>{{ t.s3p1 }}</p>
          <ul>
            <li v-for="item in t.s3list" :key="item">{{ item }}</li>
          </ul>
          <p>{{ t.s3p2 }}</p>

          <h2>{{ t.s4Title }}</h2>
          <p>{{ t.s4p1 }}</p>

          <h2>{{ t.s5Title }}</h2>
          <p>{{ t.s5p1 }}</p>

          <h2>{{ t.s6Title }}</h2>
          <p>{{ t.s6p1 }}</p>
          <p>{{ t.s6p2 }}</p>

          <h2>{{ t.s7Title }}</h2>
          <p>{{ t.s7p1 }}</p>
          <ul>
            <li v-for="item in t.s7list" :key="item">{{ item }}</li>
          </ul>
          <p>{{ t.s7p2 }}</p>

          <h2>{{ t.s8Title }}</h2>
          <p>{{ t.s8p1 }}</p>

          <div class="legal-contact-box">
            <p><strong>{{ t.contactController }}</strong> Boat Solutions International S.L.</p>
            <p><strong>{{ t.contactEmail }}</strong> <a href="mailto:info@boat-solutions.es">info@boat-solutions.es</a></p>
            <p><strong>{{ t.contactPhone }}</strong> <a href="tel:+34676625595">+34 676 625 595</a></p>
            <p><strong>{{ t.contactLocation }}</strong> {{ t.contactLocationValue }}</p>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useLanguage } from '../composables/useLanguage'
import { usePageMeta } from '../composables/useMeta'

const { lang } = useLanguage()

const t = computed(() => lang.value === 'en' ? {
  title: 'Terms & Conditions',
  updated: 'Last updated: January 2025',
  lead: 'Welcome to BSI – Boat Solutions International. These terms and conditions set out the rules and regulations for the use of the Boat Solutions International S.L. website, located at',
  intro: 'By accessing this website, you accept these terms and conditions. Please do not continue to use BSI – Boat Solutions International if you do not agree to all of the terms and conditions stated on this page.',
  s1Title: 'Cookies',
  s1p1: 'The website uses cookies to help personalise your online experience. By accessing BSI – Boat Solutions International, you agreed to use the required cookies.',
  s1p2: 'A cookie is a text file that is placed on your hard disk by a web page server. Cookies cannot be used to run programs or deliver viruses to your computer. Cookies are uniquely assigned to you, and can only be read by a web server in the domain that issued the cookie to you.',
  s1p3: 'We may use cookies to collect, store and track information for statistical or marketing purposes to operate our website. You have the ability to accept or decline optional cookies. There are some required cookies that are necessary for the operation of our website and these do not require your consent.',
  s2Title: 'License',
  s2p1: 'Unless otherwise stated, Boat Solutions International S.L. and/or its licensors own the intellectual property rights for all material on BSI – Boat Solutions International. All intellectual property rights are reserved.',
  s2p2: 'You must not:',
  s2list: [
    'Copy or republish material from BSI – Boat Solutions International',
    'Sell, rent or sub-license material from BSI – Boat Solutions International',
    'Reproduce, duplicate or copy material from BSI – Boat Solutions International',
    'Redistribute content from BSI – Boat Solutions International',
  ],
  s3Title: 'Hyperlinking to our content',
  s3p1: 'The following organisations may link to our website without prior written approval:',
  s3list: [
    'Government agencies',
    'Search engines',
    'News organisations',
    'Online directory distributors',
    'Systemically accredited businesses',
  ],
  s3p2: 'These organisations may link to our home page, to publications or to other website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits within the context of the linking party\'s site.',
  s4Title: 'Content liability',
  s4p1: 'We shall not be responsible for any content that appears on your website. You agree to protect and defend us against all claims that are rising on your website. No link(s) should appear on any website that may be interpreted as libellous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.',
  s5Title: 'Reservation of rights',
  s5p1: 'We reserve the right to request that you remove all links or any particular link to our website. You approve to immediately remove all links to our website upon request. We also reserve the right to amend these terms and conditions and its linking policy at any time.',
  s6Title: 'Removal of links from our website',
  s6p1: 'If you find any link on our website that is offensive for any reason, you are free to contact and inform us at any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.',
  s6p2: 'We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.',
  s7Title: 'Disclaimer',
  s7p1: 'To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:',
  s7list: [
    'Limit or exclude our or your liability for death or personal injury',
    'Limit or exclude our or your liability for fraud or fraudulent misrepresentation',
    'Limit any of our or your liabilities in any way that is not permitted under applicable law',
    'Exclude any of our or your liabilities that may not be excluded under applicable law',
  ],
  s7p2: 'As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.',
  s8Title: 'Contact information',
  s8p1: 'If you have any questions about these Terms and Conditions, please contact us:',
  contactController: 'Responsible:',
  contactEmail: 'Email:',
  contactPhone: 'Phone:',
  contactLocation: 'Location:',
  contactLocationValue: 'Vigo, Pontevedra, Spain',
} : {
  title: 'Términos y Condiciones',
  updated: 'Última actualización: enero de 2025',
  lead: 'Bienvenido a BSI - Boat Solutions International. Estos términos y condiciones establecen las normas y regulaciones para el uso del sitio web de Boat Solutions International S.L., ubicado en',
  intro: 'Al acceder a este sitio web, aceptas estos términos y condiciones. No continúes usando BSI - Boat Solutions International si no estás de acuerdo con todos los términos y condiciones establecidos en esta página.',
  s1Title: 'Cookies',
  s1p1: 'El sitio web utiliza cookies para ayudar a personalizar tu experiencia en línea. Al acceder a BSI - Boat Solutions International, aceptas el uso de las cookies necesarias.',
  s1p2: 'Una cookie es un archivo de texto que un servidor web coloca en tu disco duro. Las cookies no pueden utilizarse para ejecutar programas ni para enviar virus a tu ordenador. Las cookies se asignan de forma exclusiva a ti y solo pueden ser leídas por un servidor web en el dominio que te emitió la cookie.',
  s1p3: 'Podemos utilizar cookies para recopilar, almacenar y rastrear información con fines estadísticos o de marketing para operar nuestro sitio web. Tienes la posibilidad de aceptar o rechazar las cookies opcionales. Algunas cookies son necesarias para el funcionamiento de nuestro sitio web y no requieren tu consentimiento.',
  s2Title: 'Licencia',
  s2p1: 'Salvo que se indique lo contrario, Boat Solutions International S.L. y/o sus licenciantes son propietarios de los derechos de propiedad intelectual de todo el material publicado en BSI - Boat Solutions International. Todos los derechos de propiedad intelectual están reservados.',
  s2p2: 'No está permitido:',
  s2list: [
    'Copiar o republicar material de BSI - Boat Solutions International',
    'Vender, alquilar o sublicenciar material de BSI - Boat Solutions International',
    'Reproducir, duplicar o copiar material de BSI - Boat Solutions International',
    'Redistribuir contenido de BSI - Boat Solutions International',
  ],
  s3Title: 'Hipervínculos a nuestro contenido',
  s3p1: 'Las siguientes organizaciones pueden enlazar a nuestro sitio web sin aprobación previa por escrito:',
  s3list: [
    'Organismos gubernamentales',
    'Motores de búsqueda',
    'Organizaciones de noticias',
    'Distribuidores de directorios en línea',
    'Empresas acreditadas a nivel sistémico',
  ],
  s3p2: 'Estas organizaciones pueden enlazar a nuestra página de inicio, publicaciones u otra información del sitio web, siempre que el enlace: (a) no sea engañoso de ninguna manera; (b) no implique falsamente patrocinio, respaldo o aprobación de la parte que enlaza y sus productos o servicios; y (c) se ajuste al contexto del sitio de la parte que enlaza.',
  s4Title: 'Responsabilidad sobre el contenido',
  s4p1: 'No nos hacemos responsables de ningún contenido que aparezca en tu sitio web. Aceptas protegernos y defendernos frente a todas las reclamaciones que se planteen en tu sitio web. Ningún enlace debe aparecer en ningún sitio web que pueda interpretarse como difamatorio, obsceno o delictivo, o que infrinja, vulnere o defienda la infracción u otra violación de los derechos de terceros.',
  s5Title: 'Reserva de derechos',
  s5p1: 'Nos reservamos el derecho de solicitarte que elimines todos los enlaces o cualquier enlace en particular a nuestro sitio web. Aceptas eliminar inmediatamente todos los enlaces a nuestro sitio web cuando así se te solicite. También nos reservamos el derecho de modificar estos términos y condiciones y su política de enlazado en cualquier momento.',
  s6Title: 'Eliminación de enlaces',
  s6p1: 'Si encuentras algún enlace en nuestro sitio web que te resulte ofensivo por cualquier motivo, eres libre de contactarnos e informarnos en cualquier momento. Consideraremos las solicitudes de eliminación de enlaces, pero no estamos obligados a hacerlo ni a responderte directamente.',
  s6p2: 'No garantizamos que la información de este sitio web sea correcta, ni su integridad o exactitud, ni prometemos garantizar que el sitio web permanezca disponible o que el material del sitio web se mantenga actualizado.',
  s7Title: 'Exención de responsabilidad',
  s7p1: 'En la máxima medida permitida por la legislación aplicable, excluimos todas las declaraciones, garantías y condiciones relacionadas con nuestro sitio web y el uso de este sitio web. Nada en esta exención de responsabilidad:',
  s7list: [
    'Limitará o excluirá nuestra responsabilidad o la tuya por muerte o lesiones personales',
    'Limitará o excluirá nuestra responsabilidad o la tuya por fraude o falsedad fraudulenta',
    'Limitará ninguna de nuestras o tus responsabilidades de ninguna manera que no esté permitida por la ley aplicable',
    'Excluirá ninguna de nuestras o tus responsabilidades que no puedan excluirse según la ley aplicable',
  ],
  s7p2: 'Mientras el sitio web y la información y servicios del sitio web se ofrezcan de forma gratuita, no seremos responsables de ninguna pérdida o daño de ninguna naturaleza.',
  s8Title: 'Información de contacto',
  s8p1: 'Si tienes alguna pregunta sobre estos Términos y Condiciones, puedes contactarnos:',
  contactController: 'Responsable:',
  contactEmail: 'Email:',
  contactPhone: 'Teléfono:',
  contactLocation: 'Ubicación:',
  contactLocationValue: 'Vigo, Pontevedra, España',
})

usePageMeta({
  es: {
    title: 'Términos y Condiciones',
    description: 'Términos y condiciones de uso del sitio web de Boat Solutions International.',
  },
  en: {
    title: 'Terms & Conditions',
    description: 'Terms and conditions for the Boat Solutions International website.',
  },
})
</script>

<style scoped>
.hero {
  background: var(--color-meteorite-dark);
  padding: 140px 20px 60px;
}

.hero-content {
  color: var(--color-light);
}

.hero-content h1 {
  font-size: 2.5rem;
  margin-bottom: 12px;
}

.hero-content p {
  font-family: var(--font-body);
  opacity: 0.6;
  font-size: 0.9rem;
}

.legal-body {
  max-width: 780px;
  margin: 0 auto;
}

.lead {
  font-size: 1.1rem;
  color: var(--color-dark);
  line-height: 1.8;
  margin-bottom: 24px;
  font-weight: 500;
}

.legal-body h2 {
  font-size: 1.35rem;
  color: var(--color-dark);
  margin-top: 44px;
  margin-bottom: 16px;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--color-primary-light);
}

.legal-body p {
  color: var(--color-gray);
  line-height: 1.85;
  margin-bottom: 16px;
  font-size: 0.97rem;
}

.legal-body ul {
  list-style: none;
  padding: 0;
  margin: 0 0 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.legal-body li {
  color: var(--color-gray);
  font-size: 0.97rem;
  padding-left: 20px;
  position: relative;
  line-height: 1.6;
}

.legal-body li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: var(--color-primary);
  font-size: 0.85rem;
}

.legal-body a {
  color: var(--color-primary);
  font-weight: 500;
  transition: opacity 0.2s;
}

.legal-body a:hover { opacity: 0.75; }

.legal-contact-box {
  margin-top: 44px;
  background: var(--color-gray-light);
  border-radius: 14px;
  padding: 28px 32px;
  border-left: 4px solid var(--color-primary);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.legal-contact-box p {
  margin: 0;
  color: var(--color-dark);
  font-size: 0.93rem;
}
</style>
