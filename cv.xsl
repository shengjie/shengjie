<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="utf-8" indent="yes" />

  <xsl:template match="/">
    <xsl:text disable-output-escaping='yes'>&lt;!DOCTYPE html&gt;</xsl:text>
    <html lang="fr" dir="ltr" xsl:version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <head>
      <meta charset="utf-8" />
      <title></title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha256-l85OmPOjvil/SOvVt3HnSSjzF1TUMyT9eV0c2BzEGzU=" crossorigin="anonymous" />
      <link href="https://fonts.googleapis.com/css?family=Lato|Lora:700&amp;display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      <link href="cv.css" rel="stylesheet" />
    </head>
    <body>
      <xsl:apply-templates select="cv" />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.3/qrcode.min.js" />
      <script src="cv.js" />
    </body>
    </html>
  </xsl:template>

  <xsl:template match="/cv">
    <article class="paper">
      <xsl:apply-templates select="profile" />

      <xsl:apply-templates select="skills" />

      <section class="experience educational">
        <h2><xsl:value-of select="educations/@title" /></h2>
        <div class="timeline">
          <xsl:apply-templates select="educations/education"/>
        </div>
      </section>

      <section class="experience professional">
        <h2><xsl:value-of select="experiences/@title" /></h2>
        <div class="timeline">
          <div class="timeline">
            <xsl:apply-templates select="experiences/experience"/>
          </div>
        </div>
      </section>
    </article>
  </xsl:template>

  <xsl:template match="/cv/profile">
    <section class="profile">
      <div class="photo">
        <img>
          <xsl:attribute name="src"><xsl:value-of select="photo" /></xsl:attribute>
          <xsl:attribute name="alt"><xsl:value-of select="lastName" /> <xsl:value-of select="firstName" /></xsl:attribute>
        </img>
      </div>
      <div class="name">
        <xsl:value-of select="lastName" />&#160;<xsl:value-of select="firstName" />
      </div>
      <div class="edu-title">
        <xsl:value-of select="educationTitle" />
      </div>
      <div class="job-title">
        <xsl:value-of select="jobTitle" />
      </div>
      <div class="profile-line">
        <xsl:value-of select="birthDate" /> (<xsl:value-of select="age" />)
        <i class="material-icons">cake</i>
      </div>
      <div class="profile-line">
        <i class="material-icons">public</i>
        <xsl:value-of select="origin" />
      </div>
      <address class="profile-line address">
        <i class="material-icons">room</i>
        <xsl:value-of select="address/line" /><br />
        <xsl:value-of select="address/city" /><br />
        <xsl:value-of select="address/country" /><br />
      </address>
      <div class="profile-line tel">
        <i class="material-icons">phone</i>
        <xsl:value-of select="contact/phone" />
      </div>
      <div class="profile-line email">
        <i class="material-icons">mail</i>
        <xsl:value-of select="contact/mail" />
      </div>
      <div class="profile-line site">
        <img src="img/linkedin-logo.svg" />
        <a>
          <xsl:attribute name="href"><xsl:value-of select="linkedin" /></xsl:attribute>
          <xsl:value-of select="linkedin/@name" />
        </a>
      </div>
      <ul class="langs">
        <xsl:for-each select="languages/language">
          <li>
            <xsl:value-of select="text()" />:
            <span class="stars">
              <i class="material-icons"><xsl:choose><xsl:when test="@level&gt;=1">star</xsl:when><xsl:otherwise>star_border</xsl:otherwise></xsl:choose></i>
              <i class="material-icons"><xsl:choose><xsl:when test="@level&gt;=3">star</xsl:when><xsl:otherwise>star_border</xsl:otherwise></xsl:choose></i>
              <i class="material-icons"><xsl:choose><xsl:when test="@level&gt;=2">star</xsl:when><xsl:otherwise>star_border</xsl:otherwise></xsl:choose></i>
              <i class="material-icons"><xsl:choose><xsl:when test="@level&gt;=4">star</xsl:when><xsl:otherwise>star_border</xsl:otherwise></xsl:choose></i>
              <i class="material-icons"><xsl:choose><xsl:when test="@level&gt;=5">star</xsl:when><xsl:otherwise>star_border</xsl:otherwise></xsl:choose></i>
            </span>
          </li>
        </xsl:for-each>
      </ul>
      <ul class="hobbies">
        <xsl:for-each select="hobbies/hobby">
          <li><xsl:value-of select="text()" /></li>
        </xsl:for-each>
      </ul>

      <div  id="doc-link">
        <div class="qr-link" data-url="https://bit.ly/2lNevMd"></div>
        <a href="https://bit.ly/2lNevMd">Voir en-ligne</a>
      </div>
    </section>
  </xsl:template>

  <xsl:template match="/cv/skills">
    <section class="skills">
      <h2>
        <xsl:value-of select="@title" />
      </h2>
      <ul>
        <xsl:for-each select="skill">
          <li>
            <xsl:attribute name="class">level-<xsl:value-of select="@level" /></xsl:attribute>
            <xsl:value-of select="text()" />
          </li>
        </xsl:for-each>
      </ul>
    </section>
  </xsl:template>

  <xsl:template match="/cv/educations/education">
    <div class="event">
      <div class="time">
        <xsl:value-of select="time" />
      </div>
      <div class="badge">
        <xsl:value-of select="degree" />
      </div>
      <div class="title">
        <xsl:value-of select="school" />
      </div>
      <div class="desc">
        <xsl:value-of select="qualification" />
      </div>
    </div>
  </xsl:template>

  <xsl:template match="/cv/experiences/experience">
    <div class="event">
      <div class="time">
        <xsl:value-of select="time" />
      </div>
      <div class="badge">
        <xsl:value-of select="contract" />
      </div>
      <div class="title">
        <xsl:value-of select="company" />
      </div>
      <div class="sub-title">
        <xsl:value-of select="job" />
      </div>
      <div class="desc">
        <xsl:apply-templates select="projects/project"/>
      </div>
    </div>
  </xsl:template>

  <xsl:template match="/cv/experiences/experience/projects/project">
    <div class="project">
      <div class="project-title"><xsl:value-of select="title" /></div>
      <xsl:if test="task">
        <xsl:for-each select="task">
          <div class="project-task"><xsl:value-of select="text()" /></div>
        </xsl:for-each>
      </xsl:if>
      <div class="project-technical"><xsl:value-of select="technical" /></div>
    </div>
  </xsl:template>

</xsl:stylesheet>
